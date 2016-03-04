'use strict';var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var view_1 = require('angular2/src/core/metadata/view');
var selector_1 = require('angular2/src/compiler/selector');
var util_1 = require('./util');
var interfaces_1 = require('angular2/src/core/linker/interfaces');
// group 1: "property" from "[property]"
// group 2: "event" from "(event)"
var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
var CompileMetadataWithIdentifier = (function () {
    function CompileMetadataWithIdentifier() {
    }
    CompileMetadataWithIdentifier.fromJson = function (data) {
        return _COMPILE_METADATA_FROM_JSON[data['class']](data);
    };
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "identifier", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return CompileMetadataWithIdentifier;
})();
exports.CompileMetadataWithIdentifier = CompileMetadataWithIdentifier;
var CompileMetadataWithType = (function (_super) {
    __extends(CompileMetadataWithType, _super);
    function CompileMetadataWithType() {
        _super.apply(this, arguments);
    }
    CompileMetadataWithType.fromJson = function (data) {
        return _COMPILE_METADATA_FROM_JSON[data['class']](data);
    };
    Object.defineProperty(CompileMetadataWithType.prototype, "type", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileMetadataWithType.prototype, "identifier", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return CompileMetadataWithType;
})(CompileMetadataWithIdentifier);
exports.CompileMetadataWithType = CompileMetadataWithType;
var CompileIdentifierMetadata = (function () {
    function CompileIdentifierMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, constConstructor = _b.constConstructor;
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.constConstructor = constConstructor;
    }
    CompileIdentifierMetadata.fromJson = function (data) {
        return new CompileIdentifierMetadata({
            name: data['name'],
            prefix: data['prefix'],
            moduleUrl: data['moduleUrl'],
            constConstructor: data['constConstructor']
        });
    };
    CompileIdentifierMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'class': 'Identifier',
            'name': this.name,
            'moduleUrl': this.moduleUrl,
            'prefix': this.prefix,
            'constConstructor': this.constConstructor
        };
    };
    Object.defineProperty(CompileIdentifierMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    return CompileIdentifierMetadata;
})();
exports.CompileIdentifierMetadata = CompileIdentifierMetadata;
var CompileDiDependencyMetadata = (function () {
    function CompileDiDependencyMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, query = _b.query, viewQuery = _b.viewQuery, token = _b.token;
        this.isAttribute = lang_1.normalizeBool(isAttribute);
        this.isSelf = lang_1.normalizeBool(isSelf);
        this.isHost = lang_1.normalizeBool(isHost);
        this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
        this.isOptional = lang_1.normalizeBool(isOptional);
        this.query = query;
        this.viewQuery = viewQuery;
        this.token = token;
    }
    CompileDiDependencyMetadata.fromJson = function (data) {
        return new CompileDiDependencyMetadata({
            token: objFromJson(data['token'], CompileIdentifierMetadata.fromJson),
            query: objFromJson(data['query'], CompileQueryMetadata.fromJson),
            viewQuery: objFromJson(data['viewQuery'], CompileQueryMetadata.fromJson),
            isAttribute: data['isAttribute'],
            isSelf: data['isSelf'],
            isHost: data['isHost'],
            isSkipSelf: data['isSkipSelf'],
            isOptional: data['isOptional']
        });
    };
    CompileDiDependencyMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'token': objToJson(this.token),
            'query': objToJson(this.query),
            'viewQuery': objToJson(this.viewQuery),
            'isAttribute': this.isAttribute,
            'isSelf': this.isSelf,
            'isHost': this.isHost,
            'isSkipSelf': this.isSkipSelf,
            'isOptional': this.isOptional
        };
    };
    return CompileDiDependencyMetadata;
})();
exports.CompileDiDependencyMetadata = CompileDiDependencyMetadata;
var CompileProviderMetadata = (function () {
    function CompileProviderMetadata(_a) {
        var token = _a.token, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.deps = deps;
        this.multi = multi;
    }
    CompileProviderMetadata.fromJson = function (data) {
        return new CompileProviderMetadata({
            token: objFromJson(data['token'], CompileIdentifierMetadata.fromJson),
            useClass: objFromJson(data['useClass'], CompileTypeMetadata.fromJson),
            useExisting: objFromJson(data['useExisting'], CompileIdentifierMetadata.fromJson),
            useValue: objFromJson(data['useValue'], CompileIdentifierMetadata.fromJson),
            useFactory: objFromJson(data['useFactory'], CompileFactoryMetadata.fromJson)
        });
    };
    CompileProviderMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'token': objToJson(this.token),
            'useClass': objToJson(this.useClass),
            'useExisting': objToJson(this.useExisting),
            'useValue': objToJson(this.useValue),
            'useFactory': objToJson(this.useFactory)
        };
    };
    return CompileProviderMetadata;
})();
exports.CompileProviderMetadata = CompileProviderMetadata;
var CompileFactoryMetadata = (function () {
    function CompileFactoryMetadata(_a) {
        var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, prefix = _a.prefix, constConstructor = _a.constConstructor, diDeps = _a.diDeps;
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.diDeps = diDeps;
        this.constConstructor = constConstructor;
    }
    Object.defineProperty(CompileFactoryMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    CompileFactoryMetadata.fromJson = function (data) {
        return new CompileFactoryMetadata({
            name: data['name'],
            prefix: data['prefix'],
            moduleUrl: data['moduleUrl'],
            constConstructor: data['constConstructor'],
            diDeps: arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
        });
    };
    CompileFactoryMetadata.prototype.toJson = function () {
        return {
            'name': this.name,
            'prefix': this.prefix,
            'moduleUrl': this.moduleUrl,
            'constConstructor': this.constConstructor,
            'diDeps': arrayToJson(this.diDeps)
        };
    };
    return CompileFactoryMetadata;
})();
exports.CompileFactoryMetadata = CompileFactoryMetadata;
/**
 * Metadata regarding compilation of a type.
 */
var CompileTypeMetadata = (function () {
    function CompileTypeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, constConstructor = _b.constConstructor, diDeps = _b.diDeps;
        this.runtime = runtime;
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.prefix = prefix;
        this.isHost = lang_1.normalizeBool(isHost);
        this.constConstructor = constConstructor;
        this.diDeps = lang_1.normalizeBlank(diDeps);
    }
    CompileTypeMetadata.fromJson = function (data) {
        return new CompileTypeMetadata({
            name: data['name'],
            moduleUrl: data['moduleUrl'],
            prefix: data['prefix'],
            isHost: data['isHost'],
            constConstructor: data['constConstructor'],
            diDeps: arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
        });
    };
    Object.defineProperty(CompileTypeMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileTypeMetadata.prototype, "type", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    CompileTypeMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'class': 'Type',
            'name': this.name,
            'moduleUrl': this.moduleUrl,
            'prefix': this.prefix,
            'isHost': this.isHost,
            'constConstructor': this.constConstructor,
            'diDeps': arrayToJson(this.diDeps)
        };
    };
    return CompileTypeMetadata;
})();
exports.CompileTypeMetadata = CompileTypeMetadata;
var CompileQueryMetadata = (function () {
    function CompileQueryMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName;
        this.selectors = selectors;
        this.descendants = descendants;
        this.first = lang_1.normalizeBool(first);
        this.propertyName = propertyName;
    }
    CompileQueryMetadata.fromJson = function (data) {
        return new CompileQueryMetadata({
            selectors: arrayFromJson(data['selectors'], CompileIdentifierMetadata.fromJson),
            descendants: data['descendants'],
            first: data['first'],
            propertyName: data['propertyName']
        });
    };
    CompileQueryMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'selectors': arrayToJson(this.selectors),
            'descendants': this.descendants,
            'first': this.first,
            'propertyName': this.propertyName
        };
    };
    return CompileQueryMetadata;
})();
exports.CompileQueryMetadata = CompileQueryMetadata;
/**
 * Metadata regarding compilation of a template.
 */
var CompileTemplateMetadata = (function () {
    function CompileTemplateMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, encapsulation = _b.encapsulation, template = _b.template, templateUrl = _b.templateUrl, styles = _b.styles, styleUrls = _b.styleUrls, ngContentSelectors = _b.ngContentSelectors;
        this.encapsulation = lang_1.isPresent(encapsulation) ? encapsulation : view_1.ViewEncapsulation.Emulated;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = lang_1.isPresent(styles) ? styles : [];
        this.styleUrls = lang_1.isPresent(styleUrls) ? styleUrls : [];
        this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
    }
    CompileTemplateMetadata.fromJson = function (data) {
        return new CompileTemplateMetadata({
            encapsulation: lang_1.isPresent(data['encapsulation']) ?
                view_1.VIEW_ENCAPSULATION_VALUES[data['encapsulation']] :
                data['encapsulation'],
            template: data['template'],
            templateUrl: data['templateUrl'],
            styles: data['styles'],
            styleUrls: data['styleUrls'],
            ngContentSelectors: data['ngContentSelectors']
        });
    };
    CompileTemplateMetadata.prototype.toJson = function () {
        return {
            'encapsulation': lang_1.isPresent(this.encapsulation) ? lang_1.serializeEnum(this.encapsulation) : this.encapsulation,
            'template': this.template,
            'templateUrl': this.templateUrl,
            'styles': this.styles,
            'styleUrls': this.styleUrls,
            'ngContentSelectors': this.ngContentSelectors
        };
    };
    return CompileTemplateMetadata;
})();
exports.CompileTemplateMetadata = CompileTemplateMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
var CompileDirectiveMetadata = (function () {
    function CompileDirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, dynamicLoadable = _b.dynamicLoadable, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
        this.type = type;
        this.isComponent = isComponent;
        this.dynamicLoadable = dynamicLoadable;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.lifecycleHooks = lifecycleHooks;
        this.providers = lang_1.normalizeBlank(providers);
        this.viewProviders = lang_1.normalizeBlank(viewProviders);
        this.queries = queries;
        this.viewQueries = viewQueries;
        this.template = template;
    }
    CompileDirectiveMetadata.create = function (_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, dynamicLoadable = _b.dynamicLoadable, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, template = _b.template;
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (lang_1.isPresent(host)) {
            collection_1.StringMapWrapper.forEach(host, function (value, key) {
                var matches = lang_1.RegExpWrapper.firstMatch(HOST_REG_EXP, key);
                if (lang_1.isBlank(matches)) {
                    hostAttributes[key] = value;
                }
                else if (lang_1.isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (lang_1.isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
            });
        }
        var inputsMap = {};
        if (lang_1.isPresent(inputs)) {
            inputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var outputsMap = {};
        if (lang_1.isPresent(outputs)) {
            outputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type: type,
            isComponent: lang_1.normalizeBool(isComponent),
            dynamicLoadable: lang_1.normalizeBool(dynamicLoadable),
            selector: selector,
            exportAs: exportAs,
            changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            hostAttributes: hostAttributes,
            lifecycleHooks: lang_1.isPresent(lifecycleHooks) ? lifecycleHooks : [],
            providers: providers,
            viewProviders: viewProviders,
            queries: queries,
            viewQueries: viewQueries,
            template: template
        });
    };
    Object.defineProperty(CompileDirectiveMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    CompileDirectiveMetadata.fromJson = function (data) {
        return new CompileDirectiveMetadata({
            isComponent: data['isComponent'],
            dynamicLoadable: data['dynamicLoadable'],
            selector: data['selector'],
            exportAs: data['exportAs'],
            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
            changeDetection: lang_1.isPresent(data['changeDetection']) ?
                change_detection_1.CHANGE_DETECTION_STRATEGY_VALUES[data['changeDetection']] :
                data['changeDetection'],
            inputs: data['inputs'],
            outputs: data['outputs'],
            hostListeners: data['hostListeners'],
            hostProperties: data['hostProperties'],
            hostAttributes: data['hostAttributes'],
            lifecycleHooks: data['lifecycleHooks'].map(function (hookValue) { return interfaces_1.LIFECYCLE_HOOKS_VALUES[hookValue]; }),
            template: lang_1.isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
                data['template'],
            providers: arrayFromJson(data['providers'], CompileProviderMetadata.fromJson)
        });
    };
    CompileDirectiveMetadata.prototype.toJson = function () {
        return {
            'class': 'Directive',
            'isComponent': this.isComponent,
            'dynamicLoadable': this.dynamicLoadable,
            'selector': this.selector,
            'exportAs': this.exportAs,
            'type': lang_1.isPresent(this.type) ? this.type.toJson() : this.type,
            'changeDetection': lang_1.isPresent(this.changeDetection) ? lang_1.serializeEnum(this.changeDetection) :
                this.changeDetection,
            'inputs': this.inputs,
            'outputs': this.outputs,
            'hostListeners': this.hostListeners,
            'hostProperties': this.hostProperties,
            'hostAttributes': this.hostAttributes,
            'lifecycleHooks': this.lifecycleHooks.map(function (hook) { return lang_1.serializeEnum(hook); }),
            'template': lang_1.isPresent(this.template) ? this.template.toJson() : this.template,
            'providers': arrayToJson(this.providers)
        };
    };
    return CompileDirectiveMetadata;
})();
exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
/**
 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 */
function createHostComponentMeta(componentType, componentSelector) {
    var template = selector_1.CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: "Host" + componentType.name,
            moduleUrl: componentType.moduleUrl,
            isHost: true
        }),
        template: new CompileTemplateMetadata({ template: template, templateUrl: '', styles: [], styleUrls: [], ngContentSelectors: [] }),
        changeDetection: change_detection_1.ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        lifecycleHooks: [],
        isComponent: true,
        dynamicLoadable: false,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: []
    });
}
exports.createHostComponentMeta = createHostComponentMeta;
var CompilePipeMetadata = (function () {
    function CompilePipeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure;
        this.type = type;
        this.name = name;
        this.pure = lang_1.normalizeBool(pure);
    }
    Object.defineProperty(CompilePipeMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    CompilePipeMetadata.fromJson = function (data) {
        return new CompilePipeMetadata({
            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
            name: data['name'],
            pure: data['pure']
        });
    };
    CompilePipeMetadata.prototype.toJson = function () {
        return {
            'class': 'Pipe',
            'type': lang_1.isPresent(this.type) ? this.type.toJson() : null,
            'name': this.name,
            'pure': this.pure
        };
    };
    return CompilePipeMetadata;
})();
exports.CompilePipeMetadata = CompilePipeMetadata;
var _COMPILE_METADATA_FROM_JSON = {
    'Directive': CompileDirectiveMetadata.fromJson,
    'Pipe': CompilePipeMetadata.fromJson,
    'Type': CompileTypeMetadata.fromJson,
    'Identifier': CompileIdentifierMetadata.fromJson
};
function arrayFromJson(obj, fn) {
    return lang_1.isBlank(obj) ? null : obj.map(function (o) { return objFromJson(o, fn); });
}
function arrayToJson(obj) {
    return lang_1.isBlank(obj) ? null : obj.map(objToJson);
}
function objFromJson(obj, fn) {
    return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : fn(obj);
}
function objToJson(obj) {
    return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : obj.toJson();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX21ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9tZXRhZGF0YS50cyJdLCJuYW1lcyI6WyJDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciIsIkNvbXBpbGVNZXRhZGF0YVdpdGhJZGVudGlmaWVyLmNvbnN0cnVjdG9yIiwiQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIuZnJvbUpzb24iLCJDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllci5pZGVudGlmaWVyIiwiQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUiLCJDb21waWxlTWV0YWRhdGFXaXRoVHlwZS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVNZXRhZGF0YVdpdGhUeXBlLmZyb21Kc29uIiwiQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUudHlwZSIsIkNvbXBpbGVNZXRhZGF0YVdpdGhUeXBlLmlkZW50aWZpZXIiLCJDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIiwiQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLnRvSnNvbiIsIkNvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuaWRlbnRpZmllciIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbiIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS50b0pzb24iLCJDb21waWxlUHJvdmlkZXJNZXRhZGF0YSIsIkNvbXBpbGVQcm92aWRlck1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlUHJvdmlkZXJNZXRhZGF0YS50b0pzb24iLCJDb21waWxlRmFjdG9yeU1ldGFkYXRhIiwiQ29tcGlsZUZhY3RvcnlNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVGYWN0b3J5TWV0YWRhdGEuaWRlbnRpZmllciIsIkNvbXBpbGVGYWN0b3J5TWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlRmFjdG9yeU1ldGFkYXRhLnRvSnNvbiIsIkNvbXBpbGVUeXBlTWV0YWRhdGEiLCJDb21waWxlVHlwZU1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbiIsIkNvbXBpbGVUeXBlTWV0YWRhdGEuaWRlbnRpZmllciIsIkNvbXBpbGVUeXBlTWV0YWRhdGEudHlwZSIsIkNvbXBpbGVUeXBlTWV0YWRhdGEudG9Kc29uIiwiQ29tcGlsZVF1ZXJ5TWV0YWRhdGEiLCJDb21waWxlUXVlcnlNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVRdWVyeU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVF1ZXJ5TWV0YWRhdGEudG9Kc29uIiwiQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEiLCJDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEudG9Kc29uIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNyZWF0ZSIsIkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5pZGVudGlmaWVyIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLnRvSnNvbiIsImNyZWF0ZUhvc3RDb21wb25lbnRNZXRhIiwiQ29tcGlsZVBpcGVNZXRhZGF0YSIsIkNvbXBpbGVQaXBlTWV0YWRhdGEuY29uc3RydWN0b3IiLCJDb21waWxlUGlwZU1ldGFkYXRhLmlkZW50aWZpZXIiLCJDb21waWxlUGlwZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVBpcGVNZXRhZGF0YS50b0pzb24iLCJhcnJheUZyb21Kc29uIiwiYXJyYXlUb0pzb24iLCJvYmpGcm9tSnNvbiIsIm9ialRvSnNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQkFVTywwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xDLDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdELDJCQUErQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2hFLGlDQUdPLHFEQUFxRCxDQUFDLENBQUE7QUFDN0QscUJBQTJELGlDQUFpQyxDQUFDLENBQUE7QUFDN0YseUJBQTBCLGdDQUFnQyxDQUFDLENBQUE7QUFDM0QscUJBQTJCLFFBQVEsQ0FBQyxDQUFBO0FBQ3BDLDJCQUFxRCxxQ0FBcUMsQ0FBQyxDQUFBO0FBRTNGLHdDQUF3QztBQUN4QyxrQ0FBa0M7QUFDbEMsSUFBSSxZQUFZLEdBQUcsMENBQTBDLENBQUM7QUFFOUQ7SUFBQUE7SUFRQUMsQ0FBQ0E7SUFQUUQsc0NBQVFBLEdBQWZBLFVBQWdCQSxJQUEwQkE7UUFDeENFLE1BQU1BLENBQUNBLDJCQUEyQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7SUFDMURBLENBQUNBO0lBSURGLHNCQUFJQSxxREFBVUE7YUFBZEEsY0FBOENHLE1BQU1BLENBQUNBLDBCQUFhQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTs7O09BQUFIO0lBQ3pFQSxvQ0FBQ0E7QUFBREEsQ0FBQ0EsQUFSRCxJQVFDO0FBUnFCLHFDQUE2QixnQ0FRbEQsQ0FBQTtBQUVEO0lBQXNESSwyQ0FBNkJBO0lBQW5GQTtRQUFzREMsOEJBQTZCQTtJQVVuRkEsQ0FBQ0E7SUFUUUQsZ0NBQVFBLEdBQWZBLFVBQWdCQSxJQUEwQkE7UUFDeENFLE1BQU1BLENBQUNBLDJCQUEyQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FB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cm1hbGl6ZUJvb2wsXG4gIG5vcm1hbGl6ZUJsYW5rLFxuICBzZXJpYWxpemVFbnVtLFxuICBUeXBlLFxuICBpc1N0cmluZyxcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9uLCBWSUVXX0VOQ0FQU1VMQVRJT05fVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7Q3NzU2VsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zZWxlY3Rvcic7XG5pbXBvcnQge3NwbGl0QXRDb2xvbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3MsIExJRkVDWUNMRV9IT09LU19WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzJztcblxuLy8gZ3JvdXAgMTogXCJwcm9wZXJ0eVwiIGZyb20gXCJbcHJvcGVydHldXCJcbi8vIGdyb3VwIDI6IFwiZXZlbnRcIiBmcm9tIFwiKGV2ZW50KVwiXG52YXIgSE9TVF9SRUdfRVhQID0gL14oPzooPzpcXFsoW15cXF1dKylcXF0pfCg/OlxcKChbXlxcKV0rKVxcKSkpJC9nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gICAgcmV0dXJuIF9DT01QSUxFX01FVEFEQVRBX0ZST01fSlNPTltkYXRhWydjbGFzcyddXShkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUgZXh0ZW5kcyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgICByZXR1cm4gX0NPTVBJTEVfTUVUQURBVEFfRlJPTV9KU09OW2RhdGFbJ2NsYXNzJ11dKGRhdGEpO1xuICB9XG5cbiAgYWJzdHJhY3QgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIGdldCB0eXBlKCk6IENvbXBpbGVUeXBlTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHJ1bnRpbWU6IGFueTtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIGNvbnN0Q29uc3RydWN0b3I6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgY29uc3RDb25zdHJ1Y3Rvcn06IHtcbiAgICBydW50aW1lPzogYW55LFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBjb25zdENvbnN0cnVjdG9yPzogYm9vbGVhblxuICB9ID0ge30pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5jb25zdENvbnN0cnVjdG9yID0gY29uc3RDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBwcmVmaXg6IGRhdGFbJ3ByZWZpeCddLFxuICAgICAgbW9kdWxlVXJsOiBkYXRhWydtb2R1bGVVcmwnXSxcbiAgICAgIGNvbnN0Q29uc3RydWN0b3I6IGRhdGFbJ2NvbnN0Q29uc3RydWN0b3InXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICdjbGFzcyc6ICdJZGVudGlmaWVyJyxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ21vZHVsZVVybCc6IHRoaXMubW9kdWxlVXJsLFxuICAgICAgJ3ByZWZpeCc6IHRoaXMucHJlZml4LFxuICAgICAgJ2NvbnN0Q29uc3RydWN0b3InOiB0aGlzLmNvbnN0Q29uc3RydWN0b3JcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICBpc0F0dHJpYnV0ZTogYm9vbGVhbjtcbiAgaXNTZWxmOiBib29sZWFuO1xuICBpc0hvc3Q6IGJvb2xlYW47XG4gIGlzU2tpcFNlbGY6IGJvb2xlYW47XG4gIGlzT3B0aW9uYWw6IGJvb2xlYW47XG4gIHF1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdmlld1F1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdG9rZW46IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe2lzQXR0cmlidXRlLCBpc1NlbGYsIGlzSG9zdCwgaXNTa2lwU2VsZiwgaXNPcHRpb25hbCwgcXVlcnksIHZpZXdRdWVyeSwgdG9rZW59OiB7XG4gICAgaXNBdHRyaWJ1dGU/OiBib29sZWFuLFxuICAgIGlzU2VsZj86IGJvb2xlYW4sXG4gICAgaXNIb3N0PzogYm9vbGVhbixcbiAgICBpc1NraXBTZWxmPzogYm9vbGVhbixcbiAgICBpc09wdGlvbmFsPzogYm9vbGVhbixcbiAgICBxdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHZpZXdRdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHRva2VuPzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZ1xuICB9ID0ge30pIHtcbiAgICB0aGlzLmlzQXR0cmlidXRlID0gbm9ybWFsaXplQm9vbChpc0F0dHJpYnV0ZSk7XG4gICAgdGhpcy5pc1NlbGYgPSBub3JtYWxpemVCb29sKGlzU2VsZik7XG4gICAgdGhpcy5pc0hvc3QgPSBub3JtYWxpemVCb29sKGlzSG9zdCk7XG4gICAgdGhpcy5pc1NraXBTZWxmID0gbm9ybWFsaXplQm9vbChpc1NraXBTZWxmKTtcbiAgICB0aGlzLmlzT3B0aW9uYWwgPSBub3JtYWxpemVCb29sKGlzT3B0aW9uYWwpO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnZpZXdRdWVyeSA9IHZpZXdRdWVyeTtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKHtcbiAgICAgIHRva2VuOiBvYmpGcm9tSnNvbihkYXRhWyd0b2tlbiddLCBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHF1ZXJ5OiBvYmpGcm9tSnNvbihkYXRhWydxdWVyeSddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB2aWV3UXVlcnk6IG9iakZyb21Kc29uKGRhdGFbJ3ZpZXdRdWVyeSddLCBDb21waWxlUXVlcnlNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICBpc0F0dHJpYnV0ZTogZGF0YVsnaXNBdHRyaWJ1dGUnXSxcbiAgICAgIGlzU2VsZjogZGF0YVsnaXNTZWxmJ10sXG4gICAgICBpc0hvc3Q6IGRhdGFbJ2lzSG9zdCddLFxuICAgICAgaXNTa2lwU2VsZjogZGF0YVsnaXNTa2lwU2VsZiddLFxuICAgICAgaXNPcHRpb25hbDogZGF0YVsnaXNPcHRpb25hbCddXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ3Rva2VuJzogb2JqVG9Kc29uKHRoaXMudG9rZW4pLFxuICAgICAgJ3F1ZXJ5Jzogb2JqVG9Kc29uKHRoaXMucXVlcnkpLFxuICAgICAgJ3ZpZXdRdWVyeSc6IG9ialRvSnNvbih0aGlzLnZpZXdRdWVyeSksXG4gICAgICAnaXNBdHRyaWJ1dGUnOiB0aGlzLmlzQXR0cmlidXRlLFxuICAgICAgJ2lzU2VsZic6IHRoaXMuaXNTZWxmLFxuICAgICAgJ2lzSG9zdCc6IHRoaXMuaXNIb3N0LFxuICAgICAgJ2lzU2tpcFNlbGYnOiB0aGlzLmlzU2tpcFNlbGYsXG4gICAgICAnaXNPcHRpb25hbCc6IHRoaXMuaXNPcHRpb25hbFxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHtcbiAgdG9rZW46IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmc7XG4gIHVzZUNsYXNzOiBDb21waWxlVHlwZU1ldGFkYXRhO1xuICB1c2VWYWx1ZTogYW55O1xuICB1c2VFeGlzdGluZzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZztcbiAgdXNlRmFjdG9yeTogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YTtcbiAgZGVwczogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW107XG4gIG11bHRpOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHt0b2tlbiwgdXNlQ2xhc3MsIHVzZVZhbHVlLCB1c2VFeGlzdGluZywgdXNlRmFjdG9yeSwgZGVwcywgbXVsdGl9OiB7XG4gICAgdG9rZW4/OiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHwgc3RyaW5nLFxuICAgIHVzZUNsYXNzPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICB1c2VWYWx1ZT86IGFueSxcbiAgICB1c2VFeGlzdGluZz86IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmcsXG4gICAgdXNlRmFjdG9yeT86IENvbXBpbGVGYWN0b3J5TWV0YWRhdGEsXG4gICAgZGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdLFxuICAgIG11bHRpPzogYm9vbGVhblxuICB9KSB7XG4gICAgdGhpcy50b2tlbiA9IHRva2VuO1xuICAgIHRoaXMudXNlQ2xhc3MgPSB1c2VDbGFzcztcbiAgICB0aGlzLnVzZVZhbHVlID0gdXNlVmFsdWU7XG4gICAgdGhpcy51c2VFeGlzdGluZyA9IHVzZUV4aXN0aW5nO1xuICAgIHRoaXMudXNlRmFjdG9yeSA9IHVzZUZhY3Rvcnk7XG4gICAgdGhpcy5kZXBzID0gZGVwcztcbiAgICB0aGlzLm11bHRpID0gbXVsdGk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlUHJvdmlkZXJNZXRhZGF0YSh7XG4gICAgICB0b2tlbjogb2JqRnJvbUpzb24oZGF0YVsndG9rZW4nXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VDbGFzczogb2JqRnJvbUpzb24oZGF0YVsndXNlQ2xhc3MnXSwgQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VFeGlzdGluZzogb2JqRnJvbUpzb24oZGF0YVsndXNlRXhpc3RpbmcnXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VWYWx1ZTogb2JqRnJvbUpzb24oZGF0YVsndXNlVmFsdWUnXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICB1c2VGYWN0b3J5OiBvYmpGcm9tSnNvbihkYXRhWyd1c2VGYWN0b3J5J10sIENvbXBpbGVGYWN0b3J5TWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ3Rva2VuJzogb2JqVG9Kc29uKHRoaXMudG9rZW4pLFxuICAgICAgJ3VzZUNsYXNzJzogb2JqVG9Kc29uKHRoaXMudXNlQ2xhc3MpLFxuICAgICAgJ3VzZUV4aXN0aW5nJzogb2JqVG9Kc29uKHRoaXMudXNlRXhpc3RpbmcpLFxuICAgICAgJ3VzZVZhbHVlJzogb2JqVG9Kc29uKHRoaXMudXNlVmFsdWUpLFxuICAgICAgJ3VzZUZhY3RvcnknOiBvYmpUb0pzb24odGhpcy51c2VGYWN0b3J5KVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVGYWN0b3J5TWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHtcbiAgcnVudGltZTogRnVuY3Rpb247XG4gIG5hbWU6IHN0cmluZztcbiAgcHJlZml4OiBzdHJpbmc7XG4gIG1vZHVsZVVybDogc3RyaW5nO1xuICBjb25zdENvbnN0cnVjdG9yOiBib29sZWFuO1xuICBkaURlcHM6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgY29uc3RDb25zdHJ1Y3RvciwgZGlEZXBzfToge1xuICAgIHJ1bnRpbWU/OiBGdW5jdGlvbixcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBtb2R1bGVVcmw/OiBzdHJpbmcsXG4gICAgY29uc3RDb25zdHJ1Y3Rvcj86IGJvb2xlYW4sXG4gICAgZGlEZXBzPzogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW11cbiAgfSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLmRpRGVwcyA9IGRpRGVwcztcbiAgICB0aGlzLmNvbnN0Q29uc3RydWN0b3IgPSBjb25zdENvbnN0cnVjdG9yO1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlRmFjdG9yeU1ldGFkYXRhKHtcbiAgICAgIG5hbWU6IGRhdGFbJ25hbWUnXSxcbiAgICAgIHByZWZpeDogZGF0YVsncHJlZml4J10sXG4gICAgICBtb2R1bGVVcmw6IGRhdGFbJ21vZHVsZVVybCddLFxuICAgICAgY29uc3RDb25zdHJ1Y3RvcjogZGF0YVsnY29uc3RDb25zdHJ1Y3RvciddLFxuICAgICAgZGlEZXBzOiBhcnJheUZyb21Kc29uKGRhdGFbJ2RpRGVwcyddLCBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnbmFtZSc6IHRoaXMubmFtZSxcbiAgICAgICdwcmVmaXgnOiB0aGlzLnByZWZpeCxcbiAgICAgICdtb2R1bGVVcmwnOiB0aGlzLm1vZHVsZVVybCxcbiAgICAgICdjb25zdENvbnN0cnVjdG9yJzogdGhpcy5jb25zdENvbnN0cnVjdG9yLFxuICAgICAgJ2RpRGVwcyc6IGFycmF5VG9Kc29uKHRoaXMuZGlEZXBzKVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZWdhcmRpbmcgY29tcGlsYXRpb24gb2YgYSB0eXBlLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGlsZVR5cGVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEsIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgcnVudGltZTogVHlwZTtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIGlzSG9zdDogYm9vbGVhbjtcbiAgY29uc3RDb25zdHJ1Y3RvcjogYm9vbGVhbjtcbiAgZGlEZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXTtcblxuICBjb25zdHJ1Y3Rvcih7cnVudGltZSwgbmFtZSwgbW9kdWxlVXJsLCBwcmVmaXgsIGlzSG9zdCwgY29uc3RDb25zdHJ1Y3RvciwgZGlEZXBzfToge1xuICAgIHJ1bnRpbWU/OiBUeXBlLFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBpc0hvc3Q/OiBib29sZWFuLFxuICAgIGNvbnN0Q29uc3RydWN0b3I/OiBib29sZWFuLFxuICAgIGRpRGVwcz86IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcbiAgICB0aGlzLmlzSG9zdCA9IG5vcm1hbGl6ZUJvb2woaXNIb3N0KTtcbiAgICB0aGlzLmNvbnN0Q29uc3RydWN0b3IgPSBjb25zdENvbnN0cnVjdG9yO1xuICAgIHRoaXMuZGlEZXBzID0gbm9ybWFsaXplQmxhbmsoZGlEZXBzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVUeXBlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVR5cGVNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBtb2R1bGVVcmw6IGRhdGFbJ21vZHVsZVVybCddLFxuICAgICAgcHJlZml4OiBkYXRhWydwcmVmaXgnXSxcbiAgICAgIGlzSG9zdDogZGF0YVsnaXNIb3N0J10sXG4gICAgICBjb25zdENvbnN0cnVjdG9yOiBkYXRhWydjb25zdENvbnN0cnVjdG9yJ10sXG4gICAgICBkaURlcHM6IGFycmF5RnJvbUpzb24oZGF0YVsnZGlEZXBzJ10sIENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbilcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxuICBnZXQgdHlwZSgpOiBDb21waWxlVHlwZU1ldGFkYXRhIHsgcmV0dXJuIHRoaXM7IH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ2NsYXNzJzogJ1R5cGUnLFxuICAgICAgJ25hbWUnOiB0aGlzLm5hbWUsXG4gICAgICAnbW9kdWxlVXJsJzogdGhpcy5tb2R1bGVVcmwsXG4gICAgICAncHJlZml4JzogdGhpcy5wcmVmaXgsXG4gICAgICAnaXNIb3N0JzogdGhpcy5pc0hvc3QsXG4gICAgICAnY29uc3RDb25zdHJ1Y3Rvcic6IHRoaXMuY29uc3RDb25zdHJ1Y3RvcixcbiAgICAgICdkaURlcHMnOiBhcnJheVRvSnNvbih0aGlzLmRpRGVwcylcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlUXVlcnlNZXRhZGF0YSB7XG4gIHNlbGVjdG9yczogQXJyYXk8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZz47XG4gIGRlc2NlbmRhbnRzOiBib29sZWFuO1xuICBmaXJzdDogYm9vbGVhbjtcbiAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe3NlbGVjdG9ycywgZGVzY2VuZGFudHMsIGZpcnN0LCBwcm9wZXJ0eU5hbWV9OiB7XG4gICAgc2VsZWN0b3JzPzogQXJyYXk8Q29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZz4sXG4gICAgZGVzY2VuZGFudHM/OiBib29sZWFuLFxuICAgIGZpcnN0PzogYm9vbGVhbixcbiAgICBwcm9wZXJ0eU5hbWU/OiBzdHJpbmdcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5zZWxlY3RvcnMgPSBzZWxlY3RvcnM7XG4gICAgdGhpcy5kZXNjZW5kYW50cyA9IGRlc2NlbmRhbnRzO1xuICAgIHRoaXMuZmlyc3QgPSBub3JtYWxpemVCb29sKGZpcnN0KTtcbiAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVRdWVyeU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVRdWVyeU1ldGFkYXRhKHtcbiAgICAgIHNlbGVjdG9yczogYXJyYXlGcm9tSnNvbihkYXRhWydzZWxlY3RvcnMnXSwgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvbiksXG4gICAgICBkZXNjZW5kYW50czogZGF0YVsnZGVzY2VuZGFudHMnXSxcbiAgICAgIGZpcnN0OiBkYXRhWydmaXJzdCddLFxuICAgICAgcHJvcGVydHlOYW1lOiBkYXRhWydwcm9wZXJ0eU5hbWUnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICdzZWxlY3RvcnMnOiBhcnJheVRvSnNvbih0aGlzLnNlbGVjdG9ycyksXG4gICAgICAnZGVzY2VuZGFudHMnOiB0aGlzLmRlc2NlbmRhbnRzLFxuICAgICAgJ2ZpcnN0JzogdGhpcy5maXJzdCxcbiAgICAgICdwcm9wZXJ0eU5hbWUnOiB0aGlzLnByb3BlcnR5TmFtZVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBNZXRhZGF0YSByZWdhcmRpbmcgY29tcGlsYXRpb24gb2YgYSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb247XG4gIHRlbXBsYXRlOiBzdHJpbmc7XG4gIHRlbXBsYXRlVXJsOiBzdHJpbmc7XG4gIHN0eWxlczogc3RyaW5nW107XG4gIHN0eWxlVXJsczogc3RyaW5nW107XG4gIG5nQ29udGVudFNlbGVjdG9yczogc3RyaW5nW107XG4gIGNvbnN0cnVjdG9yKHtlbmNhcHN1bGF0aW9uLCB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmwsIHN0eWxlcywgc3R5bGVVcmxzLCBuZ0NvbnRlbnRTZWxlY3RvcnN9OiB7XG4gICAgZW5jYXBzdWxhdGlvbj86IFZpZXdFbmNhcHN1bGF0aW9uLFxuICAgIHRlbXBsYXRlPzogc3RyaW5nLFxuICAgIHRlbXBsYXRlVXJsPzogc3RyaW5nLFxuICAgIHN0eWxlcz86IHN0cmluZ1tdLFxuICAgIHN0eWxlVXJscz86IHN0cmluZ1tdLFxuICAgIG5nQ29udGVudFNlbGVjdG9ycz86IHN0cmluZ1tdXG4gIH0gPSB7fSkge1xuICAgIHRoaXMuZW5jYXBzdWxhdGlvbiA9IGlzUHJlc2VudChlbmNhcHN1bGF0aW9uKSA/IGVuY2Fwc3VsYXRpb24gOiBWaWV3RW5jYXBzdWxhdGlvbi5FbXVsYXRlZDtcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgdGhpcy50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsO1xuICAgIHRoaXMuc3R5bGVzID0gaXNQcmVzZW50KHN0eWxlcykgPyBzdHlsZXMgOiBbXTtcbiAgICB0aGlzLnN0eWxlVXJscyA9IGlzUHJlc2VudChzdHlsZVVybHMpID8gc3R5bGVVcmxzIDogW107XG4gICAgdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnMgPSBpc1ByZXNlbnQobmdDb250ZW50U2VsZWN0b3JzKSA/IG5nQ29udGVudFNlbGVjdG9ycyA6IFtdO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEoe1xuICAgICAgZW5jYXBzdWxhdGlvbjogaXNQcmVzZW50KGRhdGFbJ2VuY2Fwc3VsYXRpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIFZJRVdfRU5DQVBTVUxBVElPTl9WQUxVRVNbZGF0YVsnZW5jYXBzdWxhdGlvbiddXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsnZW5jYXBzdWxhdGlvbiddLFxuICAgICAgdGVtcGxhdGU6IGRhdGFbJ3RlbXBsYXRlJ10sXG4gICAgICB0ZW1wbGF0ZVVybDogZGF0YVsndGVtcGxhdGVVcmwnXSxcbiAgICAgIHN0eWxlczogZGF0YVsnc3R5bGVzJ10sXG4gICAgICBzdHlsZVVybHM6IGRhdGFbJ3N0eWxlVXJscyddLFxuICAgICAgbmdDb250ZW50U2VsZWN0b3JzOiBkYXRhWyduZ0NvbnRlbnRTZWxlY3RvcnMnXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2VuY2Fwc3VsYXRpb24nOlxuICAgICAgICAgIGlzUHJlc2VudCh0aGlzLmVuY2Fwc3VsYXRpb24pID8gc2VyaWFsaXplRW51bSh0aGlzLmVuY2Fwc3VsYXRpb24pIDogdGhpcy5lbmNhcHN1bGF0aW9uLFxuICAgICAgJ3RlbXBsYXRlJzogdGhpcy50ZW1wbGF0ZSxcbiAgICAgICd0ZW1wbGF0ZVVybCc6IHRoaXMudGVtcGxhdGVVcmwsXG4gICAgICAnc3R5bGVzJzogdGhpcy5zdHlsZXMsXG4gICAgICAnc3R5bGVVcmxzJzogdGhpcy5zdHlsZVVybHMsXG4gICAgICAnbmdDb250ZW50U2VsZWN0b3JzJzogdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnNcbiAgICB9O1xuICB9XG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVnYXJkaW5nIGNvbXBpbGF0aW9uIG9mIGEgZGlyZWN0aXZlLlxuICovXG5leHBvcnQgY2xhc3MgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUge1xuICBzdGF0aWMgY3JlYXRlKHt0eXBlLCBpc0NvbXBvbmVudCwgZHluYW1pY0xvYWRhYmxlLCBzZWxlY3RvciwgZXhwb3J0QXMsIGNoYW5nZURldGVjdGlvbiwgaW5wdXRzLFxuICAgICAgICAgICAgICAgICBvdXRwdXRzLCBob3N0LCBsaWZlY3ljbGVIb29rcywgcHJvdmlkZXJzLCB2aWV3UHJvdmlkZXJzLCBxdWVyaWVzLCB2aWV3UXVlcmllcyxcbiAgICAgICAgICAgICAgICAgdGVtcGxhdGV9OiB7XG4gICAgdHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgaXNDb21wb25lbnQ/OiBib29sZWFuLFxuICAgIGR5bmFtaWNMb2FkYWJsZT86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzogc3RyaW5nW10sXG4gICAgb3V0cHV0cz86IHN0cmluZ1tdLFxuICAgIGhvc3Q/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgcHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHZpZXdQcm92aWRlcnM/OiBBcnJheTxDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IENvbXBpbGVUeXBlTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgcXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdmlld1F1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgaG9zdExpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgaG9zdFByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIGhvc3RBdHRyaWJ1dGVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmIChpc1ByZXNlbnQoaG9zdCkpIHtcbiAgICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChob3N0LCAodmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBSZWdFeHBXcmFwcGVyLmZpcnN0TWF0Y2goSE9TVF9SRUdfRVhQLCBrZXkpO1xuICAgICAgICBpZiAoaXNCbGFuayhtYXRjaGVzKSkge1xuICAgICAgICAgIGhvc3RBdHRyaWJ1dGVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobWF0Y2hlc1sxXSkpIHtcbiAgICAgICAgICBob3N0UHJvcGVydGllc1ttYXRjaGVzWzFdXSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChtYXRjaGVzWzJdKSkge1xuICAgICAgICAgIGhvc3RMaXN0ZW5lcnNbbWF0Y2hlc1syXV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBpbnB1dHNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKGlzUHJlc2VudChpbnB1dHMpKSB7XG4gICAgICBpbnB1dHMuZm9yRWFjaCgoYmluZENvbmZpZzogc3RyaW5nKSA9PiB7XG4gICAgICAgIC8vIGNhbm9uaWNhbCBzeW50YXg6IGBkaXJQcm9wOiBlbFByb3BgXG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIGA6YCwgdXNlIGRpclByb3AgPSBlbFByb3BcbiAgICAgICAgdmFyIHBhcnRzID0gc3BsaXRBdENvbG9uKGJpbmRDb25maWcsIFtiaW5kQ29uZmlnLCBiaW5kQ29uZmlnXSk7XG4gICAgICAgIGlucHV0c01hcFtwYXJ0c1swXV0gPSBwYXJ0c1sxXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgb3V0cHV0c01hcDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAoaXNQcmVzZW50KG91dHB1dHMpKSB7XG4gICAgICBvdXRwdXRzLmZvckVhY2goKGJpbmRDb25maWc6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBjYW5vbmljYWwgc3ludGF4OiBgZGlyUHJvcDogZWxQcm9wYFxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBgOmAsIHVzZSBkaXJQcm9wID0gZWxQcm9wXG4gICAgICAgIHZhciBwYXJ0cyA9IHNwbGl0QXRDb2xvbihiaW5kQ29uZmlnLCBbYmluZENvbmZpZywgYmluZENvbmZpZ10pO1xuICAgICAgICBvdXRwdXRzTWFwW3BhcnRzWzBdXSA9IHBhcnRzWzFdO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEoe1xuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGlzQ29tcG9uZW50OiBub3JtYWxpemVCb29sKGlzQ29tcG9uZW50KSxcbiAgICAgIGR5bmFtaWNMb2FkYWJsZTogbm9ybWFsaXplQm9vbChkeW5hbWljTG9hZGFibGUpLFxuICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgZXhwb3J0QXM6IGV4cG9ydEFzLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBjaGFuZ2VEZXRlY3Rpb24sXG4gICAgICBpbnB1dHM6IGlucHV0c01hcCxcbiAgICAgIG91dHB1dHM6IG91dHB1dHNNYXAsXG4gICAgICBob3N0TGlzdGVuZXJzOiBob3N0TGlzdGVuZXJzLFxuICAgICAgaG9zdFByb3BlcnRpZXM6IGhvc3RQcm9wZXJ0aWVzLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGhvc3RBdHRyaWJ1dGVzLFxuICAgICAgbGlmZWN5Y2xlSG9va3M6IGlzUHJlc2VudChsaWZlY3ljbGVIb29rcykgPyBsaWZlY3ljbGVIb29rcyA6IFtdLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlcnMsXG4gICAgICB2aWV3UHJvdmlkZXJzOiB2aWV3UHJvdmlkZXJzLFxuICAgICAgcXVlcmllczogcXVlcmllcyxcbiAgICAgIHZpZXdRdWVyaWVzOiB2aWV3UXVlcmllcyxcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICAgIH0pO1xuICB9XG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIGlzQ29tcG9uZW50OiBib29sZWFuO1xuICBkeW5hbWljTG9hZGFibGU6IGJvb2xlYW47XG4gIHNlbGVjdG9yOiBzdHJpbmc7XG4gIGV4cG9ydEFzOiBzdHJpbmc7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3k7XG4gIGlucHV0czoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIG91dHB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0TGlzdGVuZXJzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdFByb3BlcnRpZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBob3N0QXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGxpZmVjeWNsZUhvb2tzOiBMaWZlY3ljbGVIb29rc1tdO1xuICBwcm92aWRlcnM6IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPjtcbiAgdmlld1Byb3ZpZGVyczogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+O1xuICBxdWVyaWVzOiBDb21waWxlUXVlcnlNZXRhZGF0YVtdO1xuICB2aWV3UXVlcmllczogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXTtcbiAgdGVtcGxhdGU6IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhO1xuICBjb25zdHJ1Y3Rvcih7dHlwZSwgaXNDb21wb25lbnQsIGR5bmFtaWNMb2FkYWJsZSwgc2VsZWN0b3IsIGV4cG9ydEFzLCBjaGFuZ2VEZXRlY3Rpb24sIGlucHV0cyxcbiAgICAgICAgICAgICAgIG91dHB1dHMsIGhvc3RMaXN0ZW5lcnMsIGhvc3RQcm9wZXJ0aWVzLCBob3N0QXR0cmlidXRlcywgbGlmZWN5Y2xlSG9va3MsIHByb3ZpZGVycyxcbiAgICAgICAgICAgICAgIHZpZXdQcm92aWRlcnMsIHF1ZXJpZXMsIHZpZXdRdWVyaWVzLCB0ZW1wbGF0ZX06IHtcbiAgICB0eXBlPzogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICBpc0NvbXBvbmVudD86IGJvb2xlYW4sXG4gICAgZHluYW1pY0xvYWRhYmxlPzogYm9vbGVhbixcbiAgICBzZWxlY3Rvcj86IHN0cmluZyxcbiAgICBleHBvcnRBcz86IHN0cmluZyxcbiAgICBjaGFuZ2VEZXRlY3Rpb24/OiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgICBpbnB1dHM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBvdXRwdXRzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgaG9zdExpc3RlbmVycz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RQcm9wZXJ0aWVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgaG9zdEF0dHJpYnV0ZXM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBsaWZlY3ljbGVIb29rcz86IExpZmVjeWNsZUhvb2tzW10sXG4gICAgcHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHZpZXdQcm92aWRlcnM/OiBBcnJheTxDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IENvbXBpbGVUeXBlTWV0YWRhdGEgfCBhbnlbXT4sXG4gICAgcXVlcmllcz86IENvbXBpbGVRdWVyeU1ldGFkYXRhW10sXG4gICAgdmlld1F1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHRlbXBsYXRlPzogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGFcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmlzQ29tcG9uZW50ID0gaXNDb21wb25lbnQ7XG4gICAgdGhpcy5keW5hbWljTG9hZGFibGUgPSBkeW5hbWljTG9hZGFibGU7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuZXhwb3J0QXMgPSBleHBvcnRBcztcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbiA9IGNoYW5nZURldGVjdGlvbjtcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcbiAgICB0aGlzLm91dHB1dHMgPSBvdXRwdXRzO1xuICAgIHRoaXMuaG9zdExpc3RlbmVycyA9IGhvc3RMaXN0ZW5lcnM7XG4gICAgdGhpcy5ob3N0UHJvcGVydGllcyA9IGhvc3RQcm9wZXJ0aWVzO1xuICAgIHRoaXMuaG9zdEF0dHJpYnV0ZXMgPSBob3N0QXR0cmlidXRlcztcbiAgICB0aGlzLmxpZmVjeWNsZUhvb2tzID0gbGlmZWN5Y2xlSG9va3M7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBub3JtYWxpemVCbGFuayhwcm92aWRlcnMpO1xuICAgIHRoaXMudmlld1Byb3ZpZGVycyA9IG5vcm1hbGl6ZUJsYW5rKHZpZXdQcm92aWRlcnMpO1xuICAgIHRoaXMucXVlcmllcyA9IHF1ZXJpZXM7XG4gICAgdGhpcy52aWV3UXVlcmllcyA9IHZpZXdRdWVyaWVzO1xuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpcy50eXBlOyB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSh7XG4gICAgICBpc0NvbXBvbmVudDogZGF0YVsnaXNDb21wb25lbnQnXSxcbiAgICAgIGR5bmFtaWNMb2FkYWJsZTogZGF0YVsnZHluYW1pY0xvYWRhYmxlJ10sXG4gICAgICBzZWxlY3RvcjogZGF0YVsnc2VsZWN0b3InXSxcbiAgICAgIGV4cG9ydEFzOiBkYXRhWydleHBvcnRBcyddLFxuICAgICAgdHlwZTogaXNQcmVzZW50KGRhdGFbJ3R5cGUnXSkgPyBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKGRhdGFbJ3R5cGUnXSkgOiBkYXRhWyd0eXBlJ10sXG4gICAgICBjaGFuZ2VEZXRlY3Rpb246IGlzUHJlc2VudChkYXRhWydjaGFuZ2VEZXRlY3Rpb24nXSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgQ0hBTkdFX0RFVEVDVElPTl9TVFJBVEVHWV9WQUxVRVNbZGF0YVsnY2hhbmdlRGV0ZWN0aW9uJ11dIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2NoYW5nZURldGVjdGlvbiddLFxuICAgICAgaW5wdXRzOiBkYXRhWydpbnB1dHMnXSxcbiAgICAgIG91dHB1dHM6IGRhdGFbJ291dHB1dHMnXSxcbiAgICAgIGhvc3RMaXN0ZW5lcnM6IGRhdGFbJ2hvc3RMaXN0ZW5lcnMnXSxcbiAgICAgIGhvc3RQcm9wZXJ0aWVzOiBkYXRhWydob3N0UHJvcGVydGllcyddLFxuICAgICAgaG9zdEF0dHJpYnV0ZXM6IGRhdGFbJ2hvc3RBdHRyaWJ1dGVzJ10sXG4gICAgICBsaWZlY3ljbGVIb29rczpcbiAgICAgICAgICAoPGFueVtdPmRhdGFbJ2xpZmVjeWNsZUhvb2tzJ10pLm1hcChob29rVmFsdWUgPT4gTElGRUNZQ0xFX0hPT0tTX1ZBTFVFU1tob29rVmFsdWVdKSxcbiAgICAgIHRlbXBsYXRlOiBpc1ByZXNlbnQoZGF0YVsndGVtcGxhdGUnXSkgPyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0ZW1wbGF0ZSddKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVsndGVtcGxhdGUnXSxcbiAgICAgIHByb3ZpZGVyczogYXJyYXlGcm9tSnNvbihkYXRhWydwcm92aWRlcnMnXSwgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEuZnJvbUpzb24pXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnRGlyZWN0aXZlJyxcbiAgICAgICdpc0NvbXBvbmVudCc6IHRoaXMuaXNDb21wb25lbnQsXG4gICAgICAnZHluYW1pY0xvYWRhYmxlJzogdGhpcy5keW5hbWljTG9hZGFibGUsXG4gICAgICAnc2VsZWN0b3InOiB0aGlzLnNlbGVjdG9yLFxuICAgICAgJ2V4cG9ydEFzJzogdGhpcy5leHBvcnRBcyxcbiAgICAgICd0eXBlJzogaXNQcmVzZW50KHRoaXMudHlwZSkgPyB0aGlzLnR5cGUudG9Kc29uKCkgOiB0aGlzLnR5cGUsXG4gICAgICAnY2hhbmdlRGV0ZWN0aW9uJzogaXNQcmVzZW50KHRoaXMuY2hhbmdlRGV0ZWN0aW9uKSA/IHNlcmlhbGl6ZUVudW0odGhpcy5jaGFuZ2VEZXRlY3Rpb24pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICAnaW5wdXRzJzogdGhpcy5pbnB1dHMsXG4gICAgICAnb3V0cHV0cyc6IHRoaXMub3V0cHV0cyxcbiAgICAgICdob3N0TGlzdGVuZXJzJzogdGhpcy5ob3N0TGlzdGVuZXJzLFxuICAgICAgJ2hvc3RQcm9wZXJ0aWVzJzogdGhpcy5ob3N0UHJvcGVydGllcyxcbiAgICAgICdob3N0QXR0cmlidXRlcyc6IHRoaXMuaG9zdEF0dHJpYnV0ZXMsXG4gICAgICAnbGlmZWN5Y2xlSG9va3MnOiB0aGlzLmxpZmVjeWNsZUhvb2tzLm1hcChob29rID0+IHNlcmlhbGl6ZUVudW0oaG9vaykpLFxuICAgICAgJ3RlbXBsYXRlJzogaXNQcmVzZW50KHRoaXMudGVtcGxhdGUpID8gdGhpcy50ZW1wbGF0ZS50b0pzb24oKSA6IHRoaXMudGVtcGxhdGUsXG4gICAgICAncHJvdmlkZXJzJzogYXJyYXlUb0pzb24odGhpcy5wcm92aWRlcnMpXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnN0cnVjdCB7QGxpbmsgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhfSBmcm9tIHtAbGluayBDb21wb25lbnRUeXBlTWV0YWRhdGF9IGFuZCBhIHNlbGVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSG9zdENvbXBvbmVudE1ldGEoY29tcG9uZW50VHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRTZWxlY3Rvcjogc3RyaW5nKTogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgdmFyIHRlbXBsYXRlID0gQ3NzU2VsZWN0b3IucGFyc2UoY29tcG9uZW50U2VsZWN0b3IpWzBdLmdldE1hdGNoaW5nRWxlbWVudFRlbXBsYXRlKCk7XG4gIHJldHVybiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEuY3JlYXRlKHtcbiAgICB0eXBlOiBuZXcgQ29tcGlsZVR5cGVNZXRhZGF0YSh7XG4gICAgICBydW50aW1lOiBPYmplY3QsXG4gICAgICBuYW1lOiBgSG9zdCR7Y29tcG9uZW50VHlwZS5uYW1lfWAsXG4gICAgICBtb2R1bGVVcmw6IGNvbXBvbmVudFR5cGUubW9kdWxlVXJsLFxuICAgICAgaXNIb3N0OiB0cnVlXG4gICAgfSksXG4gICAgdGVtcGxhdGU6IG5ldyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YShcbiAgICAgICAge3RlbXBsYXRlOiB0ZW1wbGF0ZSwgdGVtcGxhdGVVcmw6ICcnLCBzdHlsZXM6IFtdLCBzdHlsZVVybHM6IFtdLCBuZ0NvbnRlbnRTZWxlY3RvcnM6IFtdfSksXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxuICAgIGlucHV0czogW10sXG4gICAgb3V0cHV0czogW10sXG4gICAgaG9zdDoge30sXG4gICAgbGlmZWN5Y2xlSG9va3M6IFtdLFxuICAgIGlzQ29tcG9uZW50OiB0cnVlLFxuICAgIGR5bmFtaWNMb2FkYWJsZTogZmFsc2UsXG4gICAgc2VsZWN0b3I6ICcqJyxcbiAgICBwcm92aWRlcnM6IFtdLFxuICAgIHZpZXdQcm92aWRlcnM6IFtdLFxuICAgIHF1ZXJpZXM6IFtdLFxuICAgIHZpZXdRdWVyaWVzOiBbXVxuICB9KTtcbn1cblxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVBpcGVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgdHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YTtcbiAgbmFtZTogc3RyaW5nO1xuICBwdXJlOiBib29sZWFuO1xuICBjb25zdHJ1Y3Rvcih7dHlwZSwgbmFtZSxcbiAgICAgICAgICAgICAgIHB1cmV9OiB7dHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsIG5hbWU/OiBzdHJpbmcsIHB1cmU/OiBib29sZWFufSA9IHt9KSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMucHVyZSA9IG5vcm1hbGl6ZUJvb2wocHVyZSk7XG4gIH1cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzLnR5cGU7IH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlUGlwZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVQaXBlTWV0YWRhdGEoe1xuICAgICAgdHlwZTogaXNQcmVzZW50KGRhdGFbJ3R5cGUnXSkgPyBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKGRhdGFbJ3R5cGUnXSkgOiBkYXRhWyd0eXBlJ10sXG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBwdXJlOiBkYXRhWydwdXJlJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdjbGFzcyc6ICdQaXBlJyxcbiAgICAgICd0eXBlJzogaXNQcmVzZW50KHRoaXMudHlwZSkgPyB0aGlzLnR5cGUudG9Kc29uKCkgOiBudWxsLFxuICAgICAgJ25hbWUnOiB0aGlzLm5hbWUsXG4gICAgICAncHVyZSc6IHRoaXMucHVyZVxuICAgIH07XG4gIH1cbn1cblxudmFyIF9DT01QSUxFX01FVEFEQVRBX0ZST01fSlNPTiA9IHtcbiAgJ0RpcmVjdGl2ZSc6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5mcm9tSnNvbixcbiAgJ1BpcGUnOiBDb21waWxlUGlwZU1ldGFkYXRhLmZyb21Kc29uLFxuICAnVHlwZSc6IENvbXBpbGVUeXBlTWV0YWRhdGEuZnJvbUpzb24sXG4gICdJZGVudGlmaWVyJzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5mcm9tSnNvblxufTtcblxuZnVuY3Rpb24gYXJyYXlGcm9tSnNvbihvYmo6IGFueVtdLCBmbjogKGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiBhbnkpOiBhbnkge1xuICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iai5tYXAobyA9PiBvYmpGcm9tSnNvbihvLCBmbikpO1xufVxuXG5mdW5jdGlvbiBhcnJheVRvSnNvbihvYmo6IGFueVtdKTogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gaXNCbGFuayhvYmopID8gbnVsbCA6IG9iai5tYXAob2JqVG9Kc29uKTtcbn1cblxuZnVuY3Rpb24gb2JqRnJvbUpzb24ob2JqOiBhbnksIGZuOiAoYToge1trZXk6IHN0cmluZ106IGFueX0pID0+IGFueSk6IGFueSB7XG4gIHJldHVybiAoaXNTdHJpbmcob2JqKSB8fCBpc0JsYW5rKG9iaikpID8gb2JqIDogZm4ob2JqKTtcbn1cblxuZnVuY3Rpb24gb2JqVG9Kc29uKG9iajogYW55KTogc3RyaW5nIHwge1trZXk6IHN0cmluZ106IGFueX0ge1xuICByZXR1cm4gKGlzU3RyaW5nKG9iaikgfHwgaXNCbGFuayhvYmopKSA/IG9iaiA6IG9iai50b0pzb24oKTtcbn0iXX0=