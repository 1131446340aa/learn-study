#!/usr/bin/env node
const inquirer = require('inquirer')
const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs')
const axios = require('axios')
const path = require('path')
const chalk = require('chalk')

if (process.argv.length === 2) {
  console.log(chalk.red('请输入目录名！'))
  console.log(chalk.red('请输入指令  ps [文件名]！'))
  return false
}
const cwd = process.cwd()

let question = [
  {
    name: 'dir',
    type: 'input',
    message: "请选择生成文件的目录(默认'('./client/project/home/views'目录)"
  }
]

inquirer.prompt(question).then(answers => {
  if (!answers.dir) {
    answers.dir = './client/project/home/views'
  }
  let json =
    answers.dir +
    '/' +
    process.argv[process.argv.length - 1] +
    '/ps-generate.json'

  if (existsSync(json)) {
    console.log(chalk.green(`检查到${json}文件,直接读取本地参数`))
    generate(answers.dir, JSON.parse(readFileSync(json)))
    return
  }

  let options = {}
  inquirer
    .prompt([
      {
        name: 'swagger',
        type: 'input',
        message: '请输入swagger地址'
      }
    ])
    .then(res => {
      options.swaggerUrl = res.swagger
      if (!options.swaggerUrl) {
        generate(answers.dir, options)
      } else {
        inquirer
          .prompt([
            {
              name: 'type',
              type: 'input',
              message: '选择一个url模块',
              validate (val) {
                if (val === '') return '必须选择一个url模块!'
                return true
              }
            },
            {
              name: 'exclude',
              type: 'input',
              message: '请选择要排除的url（以,号隔开）'
            },
            {
              name: 'append',
              type: 'input',
              message: '请输入url前缀'
            },
            {
              name: 'clear',
              type: 'input',
              message: '请输入要消除的url前缀'
            }
          ])
          .then(answers2 => {
            options.type = answers2.type

            options.exclude = answers2.exclude.split(',')

            options.append = answers2.append

            options.clear = answers2.clear
            generate(answers.dir, options)
          })
      }
    })
})

async function generate (dir, options) {
  dir = dir.split('/').slice(1)
  let str = ''
  for (let i = 0; i < dir.length; i++) {
    str += `/${dir[i]}`
    existDir(str)
  }

  const fsName = process.argv[process.argv.length - 1]
  let currentDir = cwd + str + '/' + fsName
  makeDir(currentDir)

  makeDir(currentDir + '/component')
  makeDir(currentDir + '/apis')
  if (!existsSync(currentDir + '/index.vue')) {
    let TemplateText = readFileSync(path.join(__dirname, '/template.txt')) + ''
    TemplateText = TemplateText.replace(/myName/g, fsName)
    writeFileSync(currentDir + '/index.vue', TemplateText)
  }

  if (!existsSync(currentDir + '/apis/index.js')) {
    await generateApiText(options, currentDir)
  } else {
    inquirer
      .prompt([
        {
          name: 'api',
          type: 'input',
          message: 'apis/index文件已存在,是否覆盖（others/n）',
          validate (val) {
            return true
          }
        }
      ])
      .then(answers => {
        if (answers.api !== 'n' || answers.api !== 'N') {
          generateApiText(options, currentDir)
        }
      })
  }
}

function existDir (dir) {
  if (!existsSync(cwd + dir)) {
    mkdirSync(cwd + dir)
  }
}

async function generateUrlSet ({
  swaggerUrl,
  type,
  exclude = [],
  append = '',
  clear = ''
}) {
  let urlSet = []
  if (swaggerUrl) {
    let res
    try {
      res = await axios.get(swaggerUrl)
    } catch {
      console.log(chalk.red('请检查网络或者检查地址' + swaggerUrl))
    }
    if (!res) {
      return false
    }
    //获取对应SwaggerUI里面的所有path
    let filterPaths = {}

    //过滤出包含type字符串的接口Path
    Object.keys(res.data.paths).forEach(pathName => {
      if (~pathName.indexOf(type)) {
        if (!~exclude.indexOf(pathName)) {
          filterPaths[pathName] = res.data.paths[pathName]
        }
      }
    })
    Object.keys(filterPaths).forEach(pathName => {
      //同一个域名可能请求方法有多种
      Object.keys(filterPaths[pathName]).forEach(methods => {
        let url = pathName
        let name = pathName.replace(type, 'Api')
        name[0] !== '/' && (name = '/' + name)
        if (pathName.slice(0, clear.length) === clear) {
          url = pathName.slice(clear.length)
        }
        append && (url = append + url)
        urlSet.push({
          methods,
          name:
            methods +
            name.replace(/(\/.)/g, ($0, $1) => $1.slice(1).toUpperCase()),
          headers: {},
          url
        })
      })
    })
  } else {
    urlSet = [
      {
        methods: 'get',
        name: '',
        headers: {},
        url: ''
      }
    ]
  }

  return urlSet
}

function makeDir (dirName) {
  if (!existsSync(dirName)) {
    mkdirSync(dirName)
  }
}

async function generateApiText (options, currentDir) {
  let apiText = readFileSync(path.join(__dirname, '/api.txt')) + ''
  const urlSet = await generateUrlSet(options)
  if (!urlSet) return
  apiText = apiText.replace('myApi', JSON.stringify(urlSet, null, 2))
  writeFileSync(currentDir + '/apis/index.js', apiText)
  if (!existsSync(currentDir + '/ps-generate.json')) {
    writeFileSync(
      currentDir + '/ps-generate.json',
      JSON.stringify(options, null, 2)
    )
  }

  console.log(chalk.green('成功'))
  console.log(chalk.green('目录:' + currentDir))
}


function object2Class(object, modelName, deep = 0) {
  modelName = firstUpperCase(modelName)
  let code = ''
  if (modelName) {
    code = ` /*${modelName}*/
  export class ${modelName} {
    `
  }
  let arrayDeep = ''
  let result = {
    code: '',
    modelName: ''
  }
  if (Array.isArray(object)) {
    deep++
    for (let i = 0; i < deep; i++) {
      arrayDeep += '[]'
    }
    if (object.length === 0) {
      return {
        code: '',
        modelName: 'any' + arrayDeep
      }
    } else if (object.length > 0) {
      if ((object)[0] && typeof (object)[0] === 'object') {
        let res = object2Class((object)[0], modelName, deep)
        result.code = res.code
        if (Array.isArray((object)[0])) {
          result.modelName = res.modelName

        } else {
          result.modelName = `${modelName}${arrayDeep}`

        }
        return result
      } else {
        result.modelName = `${typeof (object)[0]}${arrayDeep}`
        return result
      }
    }
  } else {
    Object.keys(object).forEach(key => {
      if (object[key] && typeof object[key] === 'object') {
        let res = object2Class(object[key], key)
        code += `${key}: ${res.modelName};
    `
        code = `${res.code}
        
${code}`
      }
      else {
        code += `${key}: ${typeof object[key]};
    `
      }

      result.code = `${code}
    }`
      result.modelName = modelName + arrayDeep
    })
  }
  return result
}

function firstUpperCase(props) {
  return props.replace(/^\S/, s => s.toUpperCase())
}