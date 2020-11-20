"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var axios_1 = require("axios");
function json2Class(_a) {
    var fileName = _a.fileName, className = _a.className, jsonString = _a.jsonString;
    try {
        var modelJson = JSON.parse(jsonString);
        if (Array.isArray(modelJson)) {
            new Error('please is a Object Json');
        }
        else {
            fs_1.writeFileSync("" + fileName, object2Class(modelJson, className).code);
        }
    }
    catch (_b) {
        new Error('jsonString is an invalid jsonString');
    }
}
function object2Class(object, modelName, deep) {
    if (deep === void 0) { deep = 0; }
    modelName = firstUpperCase(modelName);
    var code = '';
    if (modelName) {
        code = " /*" + modelName + "*/\n  export class " + modelName + " {\n    ";
    }
    var arrayDeep = '';
    var result = {
        code: '',
        modelName: ''
    };
    if (Array.isArray(object)) {
        deep++;
        for (var i = 0; i < deep; i++) {
            arrayDeep += '[]';
        }
        if (object.length === 0) {
            return {
                code: '',
                modelName: 'any' + arrayDeep
            };
        }
        else if (object.length > 0) {
            if (object[0] && typeof object[0] === 'object') {
                var res = object2Class(object[0], modelName, deep);
                result.code = res.code;
                if (Array.isArray(object[0])) {
                    result.modelName = res.modelName;
                }
                else {
                    result.modelName = "" + modelName + arrayDeep;
                }
                return result;
            }
            else {
                result.modelName = "" + typeof object[0] + arrayDeep;
                return result;
            }
        }
    }
    else {
        Object.keys(object).forEach(function (key) {
            if (object[key] && typeof object[key] === 'object') {
                var res = object2Class(object[key], key);
                code += key + ": " + res.modelName + ";\n    ";
                code = res.code + "\n        \n" + code;
            }
            else {
                code += key + ": " + typeof object[key] + ";\n    ";
            }
            result.code = code + "\n    }";
            result.modelName = modelName + arrayDeep;
        });
    }
    return result;
}
function firstUpperCase(props) {
    return props.replace(/^\S/, function (s) { return s.toUpperCase(); });
}
function generateClass(urlList, options) {
    return __awaiter(this, void 0, void 0, function () {
        var resultUrl, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    options = Object.assign(axios_1["default"].defaults, options);
                    options.timeout || (options.timeout = 5000);
                    options.withCredentials || (options.withCredentials = true);
                    resultUrl = urlList.map(function (urlItem) {
                        if (!urlItem.methods) {
                            urlItem.methods = 'get';
                        }
                        if (urlItem.methods === 'get') {
                            return fetchGet(urlItem.url, urlItem.param);
                        }
                        else if (urlItem.methods === 'post') {
                            return fetchPost(urlItem.url, urlItem.data);
                        }
                    });
                    return [4 /*yield*/, Promise.all(resultUrl)];
                case 1:
                    res = _a.sent();
                    res.forEach(function (item, index) {
                        json2Class({ fileName: urlList[index].fileName, className: urlList[index].modelName, jsonString: JSON.stringify(item) });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
generateClass([{
        url: '/search',
        methods: 'get',
        param: {
            keywords: '海阔天空'
        },
        modelName: 'RulesAPi',
        fileName: '../api/rulesApi.ts'
    },], {
    baseURL: 'https://musicapi.leanapp.cn/'
});
function fetch(url, obj) {
    return new Promise(function (resolve, reject) {
        axios_1["default"](url, obj).then(function (response) {
            resolve(response.data);
        }, function (err) {
            reject(err);
        })["catch"](function (error) {
            reject(error);
        });
    });
}
function fetchPost(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        data: data,
                        method: 'post',
                        headers: { 'content-Type': 'application/json' }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function fetchGet(url, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        params: params,
                        method: 'get'
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
