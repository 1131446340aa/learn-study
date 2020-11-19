import React, { useState } from 'react';
import './App.css';


function App() {
  //数据
  const [list, setList] = useState([]);
  const [newTodo, setNewtodo] = useState('');
  const [selected, setSelected] = useState(1);
  const [hidewhat, setHideWhat] = useState("all");
  const [leftcount, setCount] = useState(list.length);

  //方法
  const handleInput = (e) => {
    if (newTodo !== '') {
      if (e.keyCode === 13) {
        setList(pre => {
          return [...pre, { things: newTodo, isComplete: "nocomplete", isedit: false }];
        });

        setCount(leftcount + 1)
        clearInput()
      }
    }
  };
  const updateThings = (e, index) => {
    let data = e.target.value
    setList(pre => {
      list[index].things = data
      
      return list
      
      // return [...pre.slice(0,index),data,...pre.slice(index+1,data.length-1)];
    })
    console.log(list)
    if (e.keyCode === 13) {
      if (data === '') {
        if (list[index]?.isComplete !== 'complete') {
          setCount(leftcount - 1)
        }
        setList(pre => {
          pre.splice(index, 1);
          return [...pre];
        })
      }
      exitEdit(e, index)
    }
  }
  const updateData = (e) => {
    setNewtodo(e.target.value)
  }
  const clearInput = () => {
    setNewtodo('')
  }
  const clearList = (index) => {
    let data = [...list];
    if (data[index].isComplete !== 'complete') {
      setCount(leftcount - 1)
    }
    data.splice(index, 1);
    setList(data);
  }
  const showAll = () => {
    setSelected(1)
    setHideWhat("all")
  }
  const showActive = () => {
    setSelected(2)
    setHideWhat("complete")
  }
  const showCompleted = () => {
    setSelected(3)
    setHideWhat("nocomplete")
  }
  const isCompleted = (e, index) => {
    if (list[index]?.isComplete === "complete") {
      setList(pre => {
        pre[index].isComplete = "nocomplete"
        return [...pre];
      })

      setCount(leftcount + 1)
    }
    else {
      setList(pre => {
        pre[index].isComplete = "complete"
        return [...pre];
      })

      setCount(leftcount - 1)
    }
  }
  const clearComplete = () => {
    let data = [...list];
    for (let index = data.length - 1; index >= 0; index--) {
      if (data[index].isComplete === "complete")
        data.splice(index, 1)
    }
    setList(data);
  }
  //双击编辑
  const edit = (e, index) => {
    setList(pre => {
        pre[index].isedit = true
      return [...pre];
    })
  }
  //退出编辑，隐藏input
  const exitEdit = (e, index) => {
    setList(pre => {
        pre[index].isedit = false
      return pre;
    })
  }


  //组件
  function Footer(props) {
    if (props.isshow === false) {
      return null
    }
    return (
      <footer>
        <span style={{ float: "left", lineHeight: '37px' }}>
          {leftcount} items left
          </span>
        <span >
          <button className={["screening", selected === 1 ? "active" : ""].join(' ')} onClick={showAll}>All</button>
          <button className={["screening", selected === 2 ? "active" : ""].join(' ')} onClick={showActive}>Active</button>
          <button className={["screening", selected === 3 ? "active" : ""].join(' ')} onClick={showCompleted}>Completed</button>
        </span>
        <button style={{ float: "right" }} className="clear" onClick={clearComplete}> Clear completed</button>
      </footer>
    )
  }

  return (
    <div className="todoapp">
      <header>
        <h1>todos</h1>
        <input type="text"
          className="new-todo"
          value={newTodo}
          onChange={updateData}
          placeholder="whats needs to be done？"
          onKeyDown={handleInput}
          autoFocus />
      </header>
      <section>
        <ul className="todo-lists" >
          <li>
            <span>
              {
                [1].map((item, index) => {
                  return (
                    <div key={list[index]?.things}
                      className={
                        ['todo-list',
                          list[index]?.isComplete === "complete" ? "Complete" : "noComplete",
                        ].join(' ')}
                      style={{ display: hidewhat === list[index]?.isComplete ? "none" : "", }}
                      
                    >
                      <input type="checkbox" className="check" onClick={(e) => isCompleted(e, index)} />
                      <label
                        onDoubleClick={(e) => edit(e, index)}
                        className={list[index]?.isedit === true ? "todos-hide" : ""}>
                        {list[index]?.things}
                      </label>
                      <input
                        // value={list[index].things}
                        // onChange={(e) => {updateThings(e, index)}}
                        onKeyDown={(e) => updateThings(e, index)}
                        onBlur={(e) => exitEdit(e, index)}
                        className={list[index]?.isedit === false ? "todos-hide" : ""}
                        autoFocus
                      >
                      </input>
                      <button onClick={(e) => clearList(index, e)} className="delete">X</button>
                    </div>
                  )
                })
              }
            </span>
          </li>
        </ul>
      </section>
      <Footer isshow={list.length !== 0 ? true : false}></Footer>
    </div>
  );
}

export default App;
