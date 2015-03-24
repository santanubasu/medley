// Lifted from underscore
var isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
};

function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

function isUndefined(obj) {
    return obj === void 0;
};

function filterObject(object, value) {
    for (var key in object) {
        if (object[key]===value) {
            delete object[key]
        }
    }
    return object;
}

function filterArray(array, value) {
    var insertionIndex = 0;
    var inspectionIndex = 0;
    while (inspectionIndex<array.length) {
        if (value!==array[inspectionIndex]) {
            array[insertionIndex] = array[inspectionIndex];
            insertionIndex++;
        }
        inspectionIndex++;
    }
    array.length = insertionIndex;
    return array;
}

function getOperationMode(sourceType, targetType, options) {
    return options.operationMode?
        (options.operationMode[sourceType]?
            (options.operationMode[sourceType][targetType]?
                options.operationMode[sourceType][targetType]:
                options.operationMode[sourceType]):
            options.operationMode):
        splice.union;
}

function isIdentityObject(object, options) {
    var count = 0;
    var identityPresent = false;
    for (var key in object) {
        if (key===options.identityKey) {
            identityPresent = true;
        }
        count++;
    }
    return count===1&&identityPresent;
}

function isEmptyObject(object) {
    var count = 0;
    for (var key in object) {
        count++;
    }
    return count===0;
}

function filterEmptyObject(object, options) {
    return (options.deleteEmptyObjects&&isEmptyObject(object))?options.deletionToken:object;
}

function _splice(source, target, options) {
    if (isUndefined(source)) {
        if (isUndefined(target)) {
            return target;
        }
        else if (isArray(target)) {
            var operationMode = getOperationMode(undefined, "array", options);
            return target;
        }
        else if (isObject(target)) {
            var operationMode = getOperationMode(undefined, "object", options);
            return (operationMode===splice.union)?filterEmptyObject(target, options):options.deletionToken;
        }
        else {
            var operationMode = getOperationMode(undefined, "value", options);
            return target;
        }
    }
    else if (isArray(source)) {
        if (isUndefined(target)) {
            var operationMode = getOperationMode("array", undefined, options);
            if (operationMode==splice.union) {
                var sourceClone = source.map(function(value) {
                    return _splice(value, {}, options)
                })
                sourceClone = filterArray(sourceClone, options.deletionToken);
                return sourceClone;
            }
            else {
                return options.deletionToken;
            }
        }
        else if (isArray(target)) {
            var operationMode = getOperationMode("array", "array", options);
            var targetIndexMap = {};
            for (var i=0; i<target.length; i++) {
                var id = target[i]?target[i][options.identityKey]:i;
                if (!id) {
                    id = i;
                }
                targetIndexMap[id] = i;
            }
            var newElements = [];
            for (var i=0; i<source.length; i++) {
                var id = source[i]?source[i][options.identityKey]:i;
                if (!id) {
                    id = i;
                }
                if (id in targetIndexMap) {
                    var targetIndex = targetIndexMap[id];
                    target[targetIndex] = _splice(source[i], target[targetIndex], options);
                }
                else {
                    newElements.push(_splice(source[i], {}, options))
                }
            }
            if (operationMode===splice.union) {
                target.push.apply(target, newElements);
            }
            target = filterArray(target, options.deletionToken);
            return target;
        }
        else if (isObject(target)) {
            var operationMode = getOperationMode("array", "object", options);
            if (operationMode==splice.union) {
                var sourceClone = source.map(function(value) {
                    return _splice(value, {}, options)
                })
                sourceClone = filterArray(sourceClone, options.deletionToken);
                return sourceClone;
            }
            else {
                return options.deletionToken;
            }
        }
        else {
            var operationMode = getOperationMode("array", "value", options);
            if (operationMode==splice.union) {
                var sourceClone = source.map(function(value) {
                    return _splice(value, {}, options)
                })
                sourceClone = filterArray(sourceClone, options.deletionToken);
                return sourceClone;
            }
            else {
                return options.deletionToken;
            }
        }
    }
    else if (isObject(source)) {
        if (isUndefined(target)) {
            var operationMode = getOperationMode("object", undefined, options);
            if (operationMode==splice.union) {
                var sourceClone = _splice(source, {}, options);
                sourceClone = filterObject(sourceClone, options.deletionToken);
                return filterEmptyObject(sourceClone, options);
            }
            else {
                return options.deletionToken;
            }
        }
        else if (isArray(target)) {
            var operationMode = getOperationMode("object", "array", options);
            if (operationMode==splice.union) {
                var sourceClone = _splice(source, {}, options);
                sourceClone = filterObject(sourceClone, options.deletionToken);
                return filterEmptyObject(sourceClone, options);
            }
            else {
                return options.deletionToken;
            }
        }
        else if (isObject(target)) {
            var operationMode = getOperationMode("object", "object", options);
            if (operationMode===splice.difference&&isIdentityObject(source, options)) {
                return options.deletionToken;
            }
            else {
                for (var key in source) {
                    if (key===options.identityKey) {
                        continue;
                    }
                    if (key in target) {
                        target[key] = _splice(source[key], target[key], options);
                    }
                    else {
                        target[key] = _splice(source[key], {}, options);
                    }
                }
                target = filterObject(target, options.deletionToken);
                return filterEmptyObject(target, options);
            }
        }
        else {
            var operationMode = getOperationMode("object", "value", options);
            var operationMode = getOperationMode("object", undefined, options);
            if (operationMode==splice.union) {
                var sourceClone = _splice(source, {}, options);
                sourceClone = filterObject(sourceClone, options.deletionToken);
                return filterEmptyObject(sourceClone, options);
            }
            else {
                return options.deletionToken;
            }
        }
    }
    else {
        if (isUndefined(target)) {
            var operationMode = getOperationMode("value", undefined, options);
            if (operationMode==splice.union) {
                return source;
            }
            else {
                return options.deletionToken;
            }
        }
        else if (isArray(target)) {
            var operationMode = getOperationMode("value", "array", options);
            if (operationMode==splice.union) {
                return source;
            }
            else {
                return options.deletionToken;
            }
        }
        else if (isObject(target)) {
            var operationMode = getOperationMode("value", "object", options);
            if (operationMode==splice.union) {
                return source;
            }
            else {
                return options.deletionToken;
            }
        }
        else {
            var operationMode = getOperationMode("value", "value", options);
            if (operationMode==splice.union) {
                return source;
            }
            else {
                return options.deletionToken;
            }
        }
    }
}

var splice = function(options) {
    return {
        merge:function(source) {
            return {
                into:function(target) {
                    options = _splice(
                        options,
                        {
                            identityKey:"id",
                            operationMode:splice.union,
                            deletionToken:null,
                            deleteEmptyObjects:false
                        },
                        {
                            operationMode:splice.union
                        }
                    );
                    return _splice(source, target, options);
                }
            }
        },
        remove:function(source) {
            return {
                from:function(target) {
                    options = _splice(
                        options,
                        {
                            identityKey:"id",
                            operationMode:splice.difference,
                            deletionToken:null,
                            deleteEmptyObjects:false
                        },
                        {
                            operationMode:splice.union
                        }
                    );
                    return _splice(source, target, options);
                }
            }
        }
    }
}

splice.union = "union";
splice.difference = "difference";
splice.merge = splice({}).merge;
splice.remove = splice({}).remove;

module.exports = splice;