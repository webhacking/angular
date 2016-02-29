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
        return new CompileDiDependencyMetadata({ token: objFromJson(data['token'], CompileIdentifierMetadata.fromJson) });
    };
    CompileDiDependencyMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'token': objToJson(this.token)
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
            useClass: objFromJson(data['useClass'], CompileTypeMetadata.fromJson)
        });
    };
    CompileProviderMetadata.prototype.toJson = function () {
        return {
            // Note: Runtime type can't be serialized...
            'token': objToJson(this.token),
            'useClass': objToJson(this.useClass)
        };
    };
    return CompileProviderMetadata;
})();
exports.CompileProviderMetadata = CompileProviderMetadata;
var CompileFactoryMetadata = (function () {
    function CompileFactoryMetadata(_a) {
        var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, constConstructor = _a.constConstructor, diDeps = _a.diDeps;
        this.runtime = runtime;
        this.name = name;
        this.moduleUrl = moduleUrl;
        this.diDeps = diDeps;
        this.constConstructor = constConstructor;
    }
    Object.defineProperty(CompileFactoryMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    CompileFactoryMetadata.prototype.toJson = function () { return null; };
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
        this.first = first;
        this.propertyName = propertyName;
    }
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
    return lang_1.isBlank(obj) ? null : obj.map(fn);
}
function arrayToJson(obj) {
    return lang_1.isBlank(obj) ? null : obj.map(function (o) { return o.toJson(); });
}
function objFromJson(obj, fn) {
    return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : fn(obj);
}
function objToJson(obj) {
    return (lang_1.isString(obj) || lang_1.isBlank(obj)) ? obj : obj.toJson();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX21ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvbXBpbGVyL2RpcmVjdGl2ZV9tZXRhZGF0YS50cyJdLCJuYW1lcyI6WyJDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciIsIkNvbXBpbGVNZXRhZGF0YVdpdGhJZGVudGlmaWVyLmNvbnN0cnVjdG9yIiwiQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIuZnJvbUpzb24iLCJDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllci5pZGVudGlmaWVyIiwiQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUiLCJDb21waWxlTWV0YWRhdGFXaXRoVHlwZS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVNZXRhZGF0YVdpdGhUeXBlLmZyb21Kc29uIiwiQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUudHlwZSIsIkNvbXBpbGVNZXRhZGF0YVdpdGhUeXBlLmlkZW50aWZpZXIiLCJDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIiwiQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLnRvSnNvbiIsIkNvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuaWRlbnRpZmllciIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YSIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS5mcm9tSnNvbiIsIkNvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YS50b0pzb24iLCJDb21waWxlUHJvdmlkZXJNZXRhZGF0YSIsIkNvbXBpbGVQcm92aWRlck1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEuZnJvbUpzb24iLCJDb21waWxlUHJvdmlkZXJNZXRhZGF0YS50b0pzb24iLCJDb21waWxlRmFjdG9yeU1ldGFkYXRhIiwiQ29tcGlsZUZhY3RvcnlNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVGYWN0b3J5TWV0YWRhdGEuaWRlbnRpZmllciIsIkNvbXBpbGVGYWN0b3J5TWV0YWRhdGEudG9Kc29uIiwiQ29tcGlsZVR5cGVNZXRhZGF0YSIsIkNvbXBpbGVUeXBlTWV0YWRhdGEuY29uc3RydWN0b3IiLCJDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVR5cGVNZXRhZGF0YS5pZGVudGlmaWVyIiwiQ29tcGlsZVR5cGVNZXRhZGF0YS50eXBlIiwiQ29tcGlsZVR5cGVNZXRhZGF0YS50b0pzb24iLCJDb21waWxlUXVlcnlNZXRhZGF0YSIsIkNvbXBpbGVRdWVyeU1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEiLCJDb21waWxlVGVtcGxhdGVNZXRhZGF0YS5jb25zdHJ1Y3RvciIsIkNvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEudG9Kc29uIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNvbnN0cnVjdG9yIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNyZWF0ZSIsIkNvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YS5pZGVudGlmaWVyIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLnRvSnNvbiIsImNyZWF0ZUhvc3RDb21wb25lbnRNZXRhIiwiQ29tcGlsZVBpcGVNZXRhZGF0YSIsIkNvbXBpbGVQaXBlTWV0YWRhdGEuY29uc3RydWN0b3IiLCJDb21waWxlUGlwZU1ldGFkYXRhLmlkZW50aWZpZXIiLCJDb21waWxlUGlwZU1ldGFkYXRhLmZyb21Kc29uIiwiQ29tcGlsZVBpcGVNZXRhZGF0YS50b0pzb24iLCJhcnJheUZy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LEdBQUdBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO0FBQ3pEQSxDQUFDQTtBQUVELG1CQUFtQixHQUFRO0lBQ3pCQyxNQUFNQSxDQUFDQSxDQUFDQSxlQUFRQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxjQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtBQUM5REEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBpc1ByZXNlbnQsXG4gIGlzQmxhbmssXG4gIG5vcm1hbGl6ZUJvb2wsXG4gIG5vcm1hbGl6ZUJsYW5rLFxuICBzZXJpYWxpemVFbnVtLFxuICBUeXBlLFxuICBpc1N0cmluZyxcbiAgUmVnRXhwV3JhcHBlcixcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1ZpZXdFbmNhcHN1bGF0aW9uLCBWSUVXX0VOQ0FQU1VMQVRJT05fVkFMVUVTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7Q3NzU2VsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci9zZWxlY3Rvcic7XG5pbXBvcnQge3NwbGl0QXRDb2xvbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7TGlmZWN5Y2xlSG9va3MsIExJRkVDWUNMRV9IT09LU19WQUxVRVN9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzJztcblxuLy8gZ3JvdXAgMTogXCJwcm9wZXJ0eVwiIGZyb20gXCJbcHJvcGVydHldXCJcbi8vIGdyb3VwIDI6IFwiZXZlbnRcIiBmcm9tIFwiKGV2ZW50KVwiXG52YXIgSE9TVF9SRUdfRVhQID0gL14oPzooPzpcXFsoW15cXF1dKylcXF0pfCg/OlxcKChbXlxcKV0rKVxcKSkpJC9nO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aElkZW50aWZpZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gICAgcmV0dXJuIF9DT01QSUxFX01FVEFEQVRBX0ZST01fSlNPTltkYXRhWydjbGFzcyddXShkYXRhKTtcbiAgfVxuXG4gIGFic3RyYWN0IHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fTtcblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIHVuaW1wbGVtZW50ZWQoKTsgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUgZXh0ZW5kcyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgICByZXR1cm4gX0NPTVBJTEVfTUVUQURBVEFfRlJPTV9KU09OW2RhdGFbJ2NsYXNzJ11dKGRhdGEpO1xuICB9XG5cbiAgYWJzdHJhY3QgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9O1xuXG4gIGdldCB0eXBlKCk6IENvbXBpbGVUeXBlTWV0YWRhdGEgeyByZXR1cm4gdW5pbXBsZW1lbnRlZCgpOyB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoSWRlbnRpZmllciB7XG4gIHJ1bnRpbWU6IGFueTtcbiAgbmFtZTogc3RyaW5nO1xuICBwcmVmaXg6IHN0cmluZztcbiAgbW9kdWxlVXJsOiBzdHJpbmc7XG4gIGNvbnN0Q29uc3RydWN0b3I6IGJvb2xlYW47XG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgY29uc3RDb25zdHJ1Y3Rvcn06IHtcbiAgICBydW50aW1lPzogYW55LFxuICAgIG5hbWU/OiBzdHJpbmcsXG4gICAgbW9kdWxlVXJsPzogc3RyaW5nLFxuICAgIHByZWZpeD86IHN0cmluZyxcbiAgICBjb25zdENvbnN0cnVjdG9yPzogYm9vbGVhblxuICB9ID0ge30pIHtcbiAgICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgdGhpcy5tb2R1bGVVcmwgPSBtb2R1bGVVcmw7XG4gICAgdGhpcy5jb25zdENvbnN0cnVjdG9yID0gY29uc3RDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSh7XG4gICAgICBuYW1lOiBkYXRhWyduYW1lJ10sXG4gICAgICBwcmVmaXg6IGRhdGFbJ3ByZWZpeCddLFxuICAgICAgbW9kdWxlVXJsOiBkYXRhWydtb2R1bGVVcmwnXSxcbiAgICAgIGNvbnN0Q29uc3RydWN0b3I6IGRhdGFbJ2NvbnN0Q29uc3RydWN0b3InXVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICdjbGFzcyc6ICdJZGVudGlmaWVyJyxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ21vZHVsZVVybCc6IHRoaXMubW9kdWxlVXJsLFxuICAgICAgJ3ByZWZpeCc6IHRoaXMucHJlZml4LFxuICAgICAgJ2NvbnN0Q29uc3RydWN0b3InOiB0aGlzLmNvbnN0Q29uc3RydWN0b3JcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICBpc0F0dHJpYnV0ZTogYm9vbGVhbjtcbiAgaXNTZWxmOiBib29sZWFuO1xuICBpc0hvc3Q6IGJvb2xlYW47XG4gIGlzU2tpcFNlbGY6IGJvb2xlYW47XG4gIGlzT3B0aW9uYWw6IGJvb2xlYW47XG4gIHF1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdmlld1F1ZXJ5OiBDb21waWxlUXVlcnlNZXRhZGF0YTtcbiAgdG9rZW46IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3Ioe2lzQXR0cmlidXRlLCBpc1NlbGYsIGlzSG9zdCwgaXNTa2lwU2VsZiwgaXNPcHRpb25hbCwgcXVlcnksIHZpZXdRdWVyeSwgdG9rZW59OiB7XG4gICAgaXNBdHRyaWJ1dGU/OiBib29sZWFuLFxuICAgIGlzU2VsZj86IGJvb2xlYW4sXG4gICAgaXNIb3N0PzogYm9vbGVhbixcbiAgICBpc1NraXBTZWxmPzogYm9vbGVhbixcbiAgICBpc09wdGlvbmFsPzogYm9vbGVhbixcbiAgICBxdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHZpZXdRdWVyeT86IENvbXBpbGVRdWVyeU1ldGFkYXRhLFxuICAgIHRva2VuPzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZ1xuICB9ID0ge30pIHtcbiAgICB0aGlzLmlzQXR0cmlidXRlID0gbm9ybWFsaXplQm9vbChpc0F0dHJpYnV0ZSk7XG4gICAgdGhpcy5pc1NlbGYgPSBub3JtYWxpemVCb29sKGlzU2VsZik7XG4gICAgdGhpcy5pc0hvc3QgPSBub3JtYWxpemVCb29sKGlzSG9zdCk7XG4gICAgdGhpcy5pc1NraXBTZWxmID0gbm9ybWFsaXplQm9vbChpc1NraXBTZWxmKTtcbiAgICB0aGlzLmlzT3B0aW9uYWwgPSBub3JtYWxpemVCb29sKGlzT3B0aW9uYWwpO1xuICAgIHRoaXMucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnZpZXdRdWVyeSA9IHZpZXdRdWVyeTtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGEge1xuICAgIHJldHVybiBuZXcgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhKFxuICAgICAgICB7dG9rZW46IG9iakZyb21Kc29uKGRhdGFbJ3Rva2VuJ10sIENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuZnJvbUpzb24pfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBSdW50aW1lIHR5cGUgY2FuJ3QgYmUgc2VyaWFsaXplZC4uLlxuICAgICAgJ3Rva2VuJzogb2JqVG9Kc29uKHRoaXMudG9rZW4pXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29tcGlsZVByb3ZpZGVyTWV0YWRhdGEge1xuICB0b2tlbjogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZztcbiAgdXNlQ2xhc3M6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIHVzZVZhbHVlOiBhbnk7XG4gIHVzZUV4aXN0aW5nOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHwgc3RyaW5nO1xuICB1c2VGYWN0b3J5OiBDb21waWxlRmFjdG9yeU1ldGFkYXRhO1xuICBkZXBzOiBDb21waWxlRGlEZXBlbmRlbmN5TWV0YWRhdGFbXTtcbiAgbXVsdGk6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3Ioe3Rva2VuLCB1c2VDbGFzcywgdXNlVmFsdWUsIHVzZUV4aXN0aW5nLCB1c2VGYWN0b3J5LCBkZXBzLCBtdWx0aX06IHtcbiAgICB0b2tlbj86IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgfCBzdHJpbmcsXG4gICAgdXNlQ2xhc3M/OiBDb21waWxlVHlwZU1ldGFkYXRhLFxuICAgIHVzZVZhbHVlPzogYW55LFxuICAgIHVzZUV4aXN0aW5nPzogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB8IHN0cmluZyxcbiAgICB1c2VGYWN0b3J5PzogQ29tcGlsZUZhY3RvcnlNZXRhZGF0YSxcbiAgICBkZXBzPzogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW10sXG4gICAgbXVsdGk/OiBib29sZWFuXG4gIH0pIHtcbiAgICB0aGlzLnRva2VuID0gdG9rZW47XG4gICAgdGhpcy51c2VDbGFzcyA9IHVzZUNsYXNzO1xuICAgIHRoaXMudXNlVmFsdWUgPSB1c2VWYWx1ZTtcbiAgICB0aGlzLnVzZUV4aXN0aW5nID0gdXNlRXhpc3Rpbmc7XG4gICAgdGhpcy51c2VGYWN0b3J5ID0gdXNlRmFjdG9yeTtcbiAgICB0aGlzLmRlcHMgPSBkZXBzO1xuICAgIHRoaXMubXVsdGkgPSBtdWx0aTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVQcm92aWRlck1ldGFkYXRhKHtcbiAgICAgIHRva2VuOiBvYmpGcm9tSnNvbihkYXRhWyd0b2tlbiddLCBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhLmZyb21Kc29uKSxcbiAgICAgIHVzZUNsYXNzOiBvYmpGcm9tSnNvbihkYXRhWyd1c2VDbGFzcyddLCBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uKVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gTm90ZTogUnVudGltZSB0eXBlIGNhbid0IGJlIHNlcmlhbGl6ZWQuLi5cbiAgICAgICd0b2tlbic6IG9ialRvSnNvbih0aGlzLnRva2VuKSxcbiAgICAgICd1c2VDbGFzcyc6IG9ialRvSnNvbih0aGlzLnVzZUNsYXNzKVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVGYWN0b3J5TWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHtcbiAgcnVudGltZTogRnVuY3Rpb247XG4gIG5hbWU6IHN0cmluZztcbiAgcHJlZml4OiBzdHJpbmc7XG4gIG1vZHVsZVVybDogc3RyaW5nO1xuICBjb25zdENvbnN0cnVjdG9yOiBib29sZWFuO1xuICBkaURlcHM6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIGNvbnN0Q29uc3RydWN0b3IsIGRpRGVwc306IHtcbiAgICBydW50aW1lPzogRnVuY3Rpb24sXG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBtb2R1bGVVcmw/OiBzdHJpbmcsXG4gICAgY29uc3RDb25zdHJ1Y3Rvcj86IGJvb2xlYW4sXG4gICAgZGlEZXBzPzogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW11cbiAgfSkge1xuICAgIHRoaXMucnVudGltZSA9IHJ1bnRpbWU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLm1vZHVsZVVybCA9IG1vZHVsZVVybDtcbiAgICB0aGlzLmRpRGVwcyA9IGRpRGVwcztcbiAgICB0aGlzLmNvbnN0Q29uc3RydWN0b3IgPSBjb25zdENvbnN0cnVjdG9yO1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG5cbiAgdG9Kc29uKCkgeyByZXR1cm4gbnVsbDsgfVxufVxuXG4vKipcbiAqIE1ldGFkYXRhIHJlZ2FyZGluZyBjb21waWxhdGlvbiBvZiBhIHR5cGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21waWxlVHlwZU1ldGFkYXRhIGltcGxlbWVudHMgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSwgQ29tcGlsZU1ldGFkYXRhV2l0aFR5cGUge1xuICBydW50aW1lOiBUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG4gIHByZWZpeDogc3RyaW5nO1xuICBtb2R1bGVVcmw6IHN0cmluZztcbiAgaXNIb3N0OiBib29sZWFuO1xuICBjb25zdENvbnN0cnVjdG9yOiBib29sZWFuO1xuICBkaURlcHM6IENvbXBpbGVEaURlcGVuZGVuY3lNZXRhZGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKHtydW50aW1lLCBuYW1lLCBtb2R1bGVVcmwsIHByZWZpeCwgaXNIb3N0LCBjb25zdENvbnN0cnVjdG9yLCBkaURlcHN9OiB7XG4gICAgcnVudGltZT86IFR5cGUsXG4gICAgbmFtZT86IHN0cmluZyxcbiAgICBtb2R1bGVVcmw/OiBzdHJpbmcsXG4gICAgcHJlZml4Pzogc3RyaW5nLFxuICAgIGlzSG9zdD86IGJvb2xlYW4sXG4gICAgY29uc3RDb25zdHJ1Y3Rvcj86IGJvb2xlYW4sXG4gICAgZGlEZXBzPzogQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhW11cbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5ydW50aW1lID0gcnVudGltZTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubW9kdWxlVXJsID0gbW9kdWxlVXJsO1xuICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgIHRoaXMuaXNIb3N0ID0gbm9ybWFsaXplQm9vbChpc0hvc3QpO1xuICAgIHRoaXMuY29uc3RDb25zdHJ1Y3RvciA9IGNvbnN0Q29uc3RydWN0b3I7XG4gICAgdGhpcy5kaURlcHMgPSBub3JtYWxpemVCbGFuayhkaURlcHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVR5cGVNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlVHlwZU1ldGFkYXRhKHtcbiAgICAgIG5hbWU6IGRhdGFbJ25hbWUnXSxcbiAgICAgIG1vZHVsZVVybDogZGF0YVsnbW9kdWxlVXJsJ10sXG4gICAgICBwcmVmaXg6IGRhdGFbJ3ByZWZpeCddLFxuICAgICAgaXNIb3N0OiBkYXRhWydpc0hvc3QnXSxcbiAgICAgIGNvbnN0Q29uc3RydWN0b3I6IGRhdGFbJ2NvbnN0Q29uc3RydWN0b3InXSxcbiAgICAgIGRpRGVwczogYXJyYXlGcm9tSnNvbihkYXRhWydkaURlcHMnXSwgQ29tcGlsZURpRGVwZW5kZW5jeU1ldGFkYXRhLmZyb21Kc29uKVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IGlkZW50aWZpZXIoKTogQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YSB7IHJldHVybiB0aGlzOyB9XG4gIGdldCB0eXBlKCk6IENvbXBpbGVUeXBlTWV0YWRhdGEgeyByZXR1cm4gdGhpczsgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIE5vdGU6IFJ1bnRpbWUgdHlwZSBjYW4ndCBiZSBzZXJpYWxpemVkLi4uXG4gICAgICAnY2xhc3MnOiAnVHlwZScsXG4gICAgICAnbmFtZSc6IHRoaXMubmFtZSxcbiAgICAgICdtb2R1bGVVcmwnOiB0aGlzLm1vZHVsZVVybCxcbiAgICAgICdwcmVmaXgnOiB0aGlzLnByZWZpeCxcbiAgICAgICdpc0hvc3QnOiB0aGlzLmlzSG9zdCxcbiAgICAgICdjb25zdENvbnN0cnVjdG9yJzogdGhpcy5jb25zdENvbnN0cnVjdG9yLFxuICAgICAgJ2RpRGVwcyc6IGFycmF5VG9Kc29uKHRoaXMuZGlEZXBzKVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVRdWVyeU1ldGFkYXRhIHtcbiAgc2VsZWN0b3JzOiBBcnJheTxDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHwgc3RyaW5nPjtcbiAgZGVzY2VuZGFudHM6IGJvb2xlYW47XG4gIGZpcnN0OiBib29sZWFuO1xuICBwcm9wZXJ0eU5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih7c2VsZWN0b3JzLCBkZXNjZW5kYW50cywgZmlyc3QsIHByb3BlcnR5TmFtZX06IHtcbiAgICBzZWxlY3RvcnM/OiBBcnJheTxDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHwgc3RyaW5nPixcbiAgICBkZXNjZW5kYW50cz86IGJvb2xlYW4sXG4gICAgZmlyc3Q/OiBib29sZWFuLFxuICAgIHByb3BlcnR5TmFtZT86IHN0cmluZ1xuICB9ID0ge30pIHtcbiAgICB0aGlzLnNlbGVjdG9ycyA9IHNlbGVjdG9ycztcbiAgICB0aGlzLmRlc2NlbmRhbnRzID0gZGVzY2VuZGFudHM7XG4gICAgdGhpcy5maXJzdCA9IGZpcnN0O1xuICAgIHRoaXMucHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lO1xuICB9XG59XG5cbi8qKlxuICogTWV0YWRhdGEgcmVnYXJkaW5nIGNvbXBpbGF0aW9uIG9mIGEgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YSB7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uO1xuICB0ZW1wbGF0ZTogc3RyaW5nO1xuICB0ZW1wbGF0ZVVybDogc3RyaW5nO1xuICBzdHlsZXM6IHN0cmluZ1tdO1xuICBzdHlsZVVybHM6IHN0cmluZ1tdO1xuICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdO1xuICBjb25zdHJ1Y3Rvcih7ZW5jYXBzdWxhdGlvbiwgdGVtcGxhdGUsIHRlbXBsYXRlVXJsLCBzdHlsZXMsIHN0eWxlVXJscywgbmdDb250ZW50U2VsZWN0b3JzfToge1xuICAgIGVuY2Fwc3VsYXRpb24/OiBWaWV3RW5jYXBzdWxhdGlvbixcbiAgICB0ZW1wbGF0ZT86IHN0cmluZyxcbiAgICB0ZW1wbGF0ZVVybD86IHN0cmluZyxcbiAgICBzdHlsZXM/OiBzdHJpbmdbXSxcbiAgICBzdHlsZVVybHM/OiBzdHJpbmdbXSxcbiAgICBuZ0NvbnRlbnRTZWxlY3RvcnM/OiBzdHJpbmdbXVxuICB9ID0ge30pIHtcbiAgICB0aGlzLmVuY2Fwc3VsYXRpb24gPSBpc1ByZXNlbnQoZW5jYXBzdWxhdGlvbikgPyBlbmNhcHN1bGF0aW9uIDogVmlld0VuY2Fwc3VsYXRpb24uRW11bGF0ZWQ7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgIHRoaXMudGVtcGxhdGVVcmwgPSB0ZW1wbGF0ZVVybDtcbiAgICB0aGlzLnN0eWxlcyA9IGlzUHJlc2VudChzdHlsZXMpID8gc3R5bGVzIDogW107XG4gICAgdGhpcy5zdHlsZVVybHMgPSBpc1ByZXNlbnQoc3R5bGVVcmxzKSA/IHN0eWxlVXJscyA6IFtdO1xuICAgIHRoaXMubmdDb250ZW50U2VsZWN0b3JzID0gaXNQcmVzZW50KG5nQ29udGVudFNlbGVjdG9ycykgPyBuZ0NvbnRlbnRTZWxlY3RvcnMgOiBbXTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhIHtcbiAgICByZXR1cm4gbmV3IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhKHtcbiAgICAgIGVuY2Fwc3VsYXRpb246IGlzUHJlc2VudChkYXRhWydlbmNhcHN1bGF0aW9uJ10pID9cbiAgICAgICAgICAgICAgICAgICAgICAgICBWSUVXX0VOQ0FQU1VMQVRJT05fVkFMVUVTW2RhdGFbJ2VuY2Fwc3VsYXRpb24nXV0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ2VuY2Fwc3VsYXRpb24nXSxcbiAgICAgIHRlbXBsYXRlOiBkYXRhWyd0ZW1wbGF0ZSddLFxuICAgICAgdGVtcGxhdGVVcmw6IGRhdGFbJ3RlbXBsYXRlVXJsJ10sXG4gICAgICBzdHlsZXM6IGRhdGFbJ3N0eWxlcyddLFxuICAgICAgc3R5bGVVcmxzOiBkYXRhWydzdHlsZVVybHMnXSxcbiAgICAgIG5nQ29udGVudFNlbGVjdG9yczogZGF0YVsnbmdDb250ZW50U2VsZWN0b3JzJ11cbiAgICB9KTtcbiAgfVxuXG4gIHRvSnNvbigpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdlbmNhcHN1bGF0aW9uJzpcbiAgICAgICAgICBpc1ByZXNlbnQodGhpcy5lbmNhcHN1bGF0aW9uKSA/IHNlcmlhbGl6ZUVudW0odGhpcy5lbmNhcHN1bGF0aW9uKSA6IHRoaXMuZW5jYXBzdWxhdGlvbixcbiAgICAgICd0ZW1wbGF0ZSc6IHRoaXMudGVtcGxhdGUsXG4gICAgICAndGVtcGxhdGVVcmwnOiB0aGlzLnRlbXBsYXRlVXJsLFxuICAgICAgJ3N0eWxlcyc6IHRoaXMuc3R5bGVzLFxuICAgICAgJ3N0eWxlVXJscyc6IHRoaXMuc3R5bGVVcmxzLFxuICAgICAgJ25nQ29udGVudFNlbGVjdG9ycyc6IHRoaXMubmdDb250ZW50U2VsZWN0b3JzXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIE1ldGFkYXRhIHJlZ2FyZGluZyBjb21waWxhdGlvbiBvZiBhIGRpcmVjdGl2ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSBpbXBsZW1lbnRzIENvbXBpbGVNZXRhZGF0YVdpdGhUeXBlIHtcbiAgc3RhdGljIGNyZWF0ZSh7dHlwZSwgaXNDb21wb25lbnQsIGR5bmFtaWNMb2FkYWJsZSwgc2VsZWN0b3IsIGV4cG9ydEFzLCBjaGFuZ2VEZXRlY3Rpb24sIGlucHV0cyxcbiAgICAgICAgICAgICAgICAgb3V0cHV0cywgaG9zdCwgbGlmZWN5Y2xlSG9va3MsIHByb3ZpZGVycywgdmlld1Byb3ZpZGVycywgcXVlcmllcywgdmlld1F1ZXJpZXMsXG4gICAgICAgICAgICAgICAgIHRlbXBsYXRlfToge1xuICAgIHR5cGU/OiBDb21waWxlVHlwZU1ldGFkYXRhLFxuICAgIGlzQ29tcG9uZW50PzogYm9vbGVhbixcbiAgICBkeW5hbWljTG9hZGFibGU/OiBib29sZWFuLFxuICAgIHNlbGVjdG9yPzogc3RyaW5nLFxuICAgIGV4cG9ydEFzPzogc3RyaW5nLFxuICAgIGNoYW5nZURldGVjdGlvbj86IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIGlucHV0cz86IHN0cmluZ1tdLFxuICAgIG91dHB1dHM/OiBzdHJpbmdbXSxcbiAgICBob3N0Pzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgbGlmZWN5Y2xlSG9va3M/OiBMaWZlY3ljbGVIb29rc1tdLFxuICAgIHByb3ZpZGVycz86IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPixcbiAgICB2aWV3UHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHF1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHZpZXdRdWVyaWVzPzogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSxcbiAgICB0ZW1wbGF0ZT86IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhXG4gIH0gPSB7fSk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIGhvc3RMaXN0ZW5lcnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgdmFyIGhvc3RQcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIHZhciBob3N0QXR0cmlidXRlczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICBpZiAoaXNQcmVzZW50KGhvc3QpKSB7XG4gICAgICBTdHJpbmdNYXBXcmFwcGVyLmZvckVhY2goaG9zdCwgKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gUmVnRXhwV3JhcHBlci5maXJzdE1hdGNoKEhPU1RfUkVHX0VYUCwga2V5KTtcbiAgICAgICAgaWYgKGlzQmxhbmsobWF0Y2hlcykpIHtcbiAgICAgICAgICBob3N0QXR0cmlidXRlc1trZXldID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KG1hdGNoZXNbMV0pKSB7XG4gICAgICAgICAgaG9zdFByb3BlcnRpZXNbbWF0Y2hlc1sxXV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQobWF0Y2hlc1syXSkpIHtcbiAgICAgICAgICBob3N0TGlzdGVuZXJzW21hdGNoZXNbMl1dID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgaW5wdXRzTWFwOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICAgIGlmIChpc1ByZXNlbnQoaW5wdXRzKSkge1xuICAgICAgaW5wdXRzLmZvckVhY2goKGJpbmRDb25maWc6IHN0cmluZykgPT4ge1xuICAgICAgICAvLyBjYW5vbmljYWwgc3ludGF4OiBgZGlyUHJvcDogZWxQcm9wYFxuICAgICAgICAvLyBpZiB0aGVyZSBpcyBubyBgOmAsIHVzZSBkaXJQcm9wID0gZWxQcm9wXG4gICAgICAgIHZhciBwYXJ0cyA9IHNwbGl0QXRDb2xvbihiaW5kQ29uZmlnLCBbYmluZENvbmZpZywgYmluZENvbmZpZ10pO1xuICAgICAgICBpbnB1dHNNYXBbcGFydHNbMF1dID0gcGFydHNbMV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIG91dHB1dHNNYXA6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gICAgaWYgKGlzUHJlc2VudChvdXRwdXRzKSkge1xuICAgICAgb3V0cHV0cy5mb3JFYWNoKChiaW5kQ29uZmlnOiBzdHJpbmcpID0+IHtcbiAgICAgICAgLy8gY2Fub25pY2FsIHN5bnRheDogYGRpclByb3A6IGVsUHJvcGBcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gYDpgLCB1c2UgZGlyUHJvcCA9IGVsUHJvcFxuICAgICAgICB2YXIgcGFydHMgPSBzcGxpdEF0Q29sb24oYmluZENvbmZpZywgW2JpbmRDb25maWcsIGJpbmRDb25maWddKTtcbiAgICAgICAgb3V0cHV0c01hcFtwYXJ0c1swXV0gPSBwYXJ0c1sxXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhKHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBpc0NvbXBvbmVudDogbm9ybWFsaXplQm9vbChpc0NvbXBvbmVudCksXG4gICAgICBkeW5hbWljTG9hZGFibGU6IG5vcm1hbGl6ZUJvb2woZHluYW1pY0xvYWRhYmxlKSxcbiAgICAgIHNlbGVjdG9yOiBzZWxlY3RvcixcbiAgICAgIGV4cG9ydEFzOiBleHBvcnRBcyxcbiAgICAgIGNoYW5nZURldGVjdGlvbjogY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgaW5wdXRzOiBpbnB1dHNNYXAsXG4gICAgICBvdXRwdXRzOiBvdXRwdXRzTWFwLFxuICAgICAgaG9zdExpc3RlbmVyczogaG9zdExpc3RlbmVycyxcbiAgICAgIGhvc3RQcm9wZXJ0aWVzOiBob3N0UHJvcGVydGllcyxcbiAgICAgIGhvc3RBdHRyaWJ1dGVzOiBob3N0QXR0cmlidXRlcyxcbiAgICAgIGxpZmVjeWNsZUhvb2tzOiBpc1ByZXNlbnQobGlmZWN5Y2xlSG9va3MpID8gbGlmZWN5Y2xlSG9va3MgOiBbXSxcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZXJzLFxuICAgICAgdmlld1Byb3ZpZGVyczogdmlld1Byb3ZpZGVycyxcbiAgICAgIHF1ZXJpZXM6IHF1ZXJpZXMsXG4gICAgICB2aWV3UXVlcmllczogdmlld1F1ZXJpZXMsXG4gICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgICB9KTtcbiAgfVxuICB0eXBlOiBDb21waWxlVHlwZU1ldGFkYXRhO1xuICBpc0NvbXBvbmVudDogYm9vbGVhbjtcbiAgZHluYW1pY0xvYWRhYmxlOiBib29sZWFuO1xuICBzZWxlY3Rvcjogc3RyaW5nO1xuICBleHBvcnRBczogc3RyaW5nO1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5O1xuICBpbnB1dHM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBvdXRwdXRzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdExpc3RlbmVyczoge1trZXk6IHN0cmluZ106IHN0cmluZ307XG4gIGhvc3RQcm9wZXJ0aWVzOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcbiAgaG9zdEF0dHJpYnV0ZXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9O1xuICBsaWZlY3ljbGVIb29rczogTGlmZWN5Y2xlSG9va3NbXTtcbiAgcHJvdmlkZXJzOiBBcnJheTxDb21waWxlUHJvdmlkZXJNZXRhZGF0YSB8IENvbXBpbGVUeXBlTWV0YWRhdGEgfCBhbnlbXT47XG4gIHZpZXdQcm92aWRlcnM6IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPjtcbiAgcXVlcmllczogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXTtcbiAgdmlld1F1ZXJpZXM6IENvbXBpbGVRdWVyeU1ldGFkYXRhW107XG4gIHRlbXBsYXRlOiBDb21waWxlVGVtcGxhdGVNZXRhZGF0YTtcbiAgY29uc3RydWN0b3Ioe3R5cGUsIGlzQ29tcG9uZW50LCBkeW5hbWljTG9hZGFibGUsIHNlbGVjdG9yLCBleHBvcnRBcywgY2hhbmdlRGV0ZWN0aW9uLCBpbnB1dHMsXG4gICAgICAgICAgICAgICBvdXRwdXRzLCBob3N0TGlzdGVuZXJzLCBob3N0UHJvcGVydGllcywgaG9zdEF0dHJpYnV0ZXMsIGxpZmVjeWNsZUhvb2tzLCBwcm92aWRlcnMsXG4gICAgICAgICAgICAgICB2aWV3UHJvdmlkZXJzLCBxdWVyaWVzLCB2aWV3UXVlcmllcywgdGVtcGxhdGV9OiB7XG4gICAgdHlwZT86IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgaXNDb21wb25lbnQ/OiBib29sZWFuLFxuICAgIGR5bmFtaWNMb2FkYWJsZT86IGJvb2xlYW4sXG4gICAgc2VsZWN0b3I/OiBzdHJpbmcsXG4gICAgZXhwb3J0QXM/OiBzdHJpbmcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uPzogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgaW5wdXRzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgb3V0cHV0cz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RMaXN0ZW5lcnM/OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSxcbiAgICBob3N0UHJvcGVydGllcz86IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9LFxuICAgIGhvc3RBdHRyaWJ1dGVzPzoge1trZXk6IHN0cmluZ106IHN0cmluZ30sXG4gICAgbGlmZWN5Y2xlSG9va3M/OiBMaWZlY3ljbGVIb29rc1tdLFxuICAgIHByb3ZpZGVycz86IEFycmF5PENvbXBpbGVQcm92aWRlck1ldGFkYXRhIHwgQ29tcGlsZVR5cGVNZXRhZGF0YSB8IGFueVtdPixcbiAgICB2aWV3UHJvdmlkZXJzPzogQXJyYXk8Q29tcGlsZVByb3ZpZGVyTWV0YWRhdGEgfCBDb21waWxlVHlwZU1ldGFkYXRhIHwgYW55W10+LFxuICAgIHF1ZXJpZXM/OiBDb21waWxlUXVlcnlNZXRhZGF0YVtdLFxuICAgIHZpZXdRdWVyaWVzPzogQ29tcGlsZVF1ZXJ5TWV0YWRhdGFbXSxcbiAgICB0ZW1wbGF0ZT86IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhXG4gIH0gPSB7fSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pc0NvbXBvbmVudCA9IGlzQ29tcG9uZW50O1xuICAgIHRoaXMuZHluYW1pY0xvYWRhYmxlID0gZHluYW1pY0xvYWRhYmxlO1xuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB0aGlzLmV4cG9ydEFzID0gZXhwb3J0QXM7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24gPSBjaGFuZ2VEZXRlY3Rpb247XG4gICAgdGhpcy5pbnB1dHMgPSBpbnB1dHM7XG4gICAgdGhpcy5vdXRwdXRzID0gb3V0cHV0cztcbiAgICB0aGlzLmhvc3RMaXN0ZW5lcnMgPSBob3N0TGlzdGVuZXJzO1xuICAgIHRoaXMuaG9zdFByb3BlcnRpZXMgPSBob3N0UHJvcGVydGllcztcbiAgICB0aGlzLmhvc3RBdHRyaWJ1dGVzID0gaG9zdEF0dHJpYnV0ZXM7XG4gICAgdGhpcy5saWZlY3ljbGVIb29rcyA9IGxpZmVjeWNsZUhvb2tzO1xuICAgIHRoaXMucHJvdmlkZXJzID0gbm9ybWFsaXplQmxhbmsocHJvdmlkZXJzKTtcbiAgICB0aGlzLnZpZXdQcm92aWRlcnMgPSBub3JtYWxpemVCbGFuayh2aWV3UHJvdmlkZXJzKTtcbiAgICB0aGlzLnF1ZXJpZXMgPSBxdWVyaWVzO1xuICAgIHRoaXMudmlld1F1ZXJpZXMgPSB2aWV3UXVlcmllcztcbiAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gIH1cblxuICBnZXQgaWRlbnRpZmllcigpOiBDb21waWxlSWRlbnRpZmllck1ldGFkYXRhIHsgcmV0dXJuIHRoaXMudHlwZTsgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEoe1xuICAgICAgaXNDb21wb25lbnQ6IGRhdGFbJ2lzQ29tcG9uZW50J10sXG4gICAgICBkeW5hbWljTG9hZGFibGU6IGRhdGFbJ2R5bmFtaWNMb2FkYWJsZSddLFxuICAgICAgc2VsZWN0b3I6IGRhdGFbJ3NlbGVjdG9yJ10sXG4gICAgICBleHBvcnRBczogZGF0YVsnZXhwb3J0QXMnXSxcbiAgICAgIHR5cGU6IGlzUHJlc2VudChkYXRhWyd0eXBlJ10pID8gQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0eXBlJ10pIDogZGF0YVsndHlwZSddLFxuICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBpc1ByZXNlbnQoZGF0YVsnY2hhbmdlRGV0ZWN0aW9uJ10pID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIENIQU5HRV9ERVRFQ1RJT05fU1RSQVRFR1lfVkFMVUVTW2RhdGFbJ2NoYW5nZURldGVjdGlvbiddXSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhWydjaGFuZ2VEZXRlY3Rpb24nXSxcbiAgICAgIGlucHV0czogZGF0YVsnaW5wdXRzJ10sXG4gICAgICBvdXRwdXRzOiBkYXRhWydvdXRwdXRzJ10sXG4gICAgICBob3N0TGlzdGVuZXJzOiBkYXRhWydob3N0TGlzdGVuZXJzJ10sXG4gICAgICBob3N0UHJvcGVydGllczogZGF0YVsnaG9zdFByb3BlcnRpZXMnXSxcbiAgICAgIGhvc3RBdHRyaWJ1dGVzOiBkYXRhWydob3N0QXR0cmlidXRlcyddLFxuICAgICAgbGlmZWN5Y2xlSG9va3M6XG4gICAgICAgICAgKDxhbnlbXT5kYXRhWydsaWZlY3ljbGVIb29rcyddKS5tYXAoaG9va1ZhbHVlID0+IExJRkVDWUNMRV9IT09LU19WQUxVRVNbaG9va1ZhbHVlXSksXG4gICAgICB0ZW1wbGF0ZTogaXNQcmVzZW50KGRhdGFbJ3RlbXBsYXRlJ10pID8gQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEuZnJvbUpzb24oZGF0YVsndGVtcGxhdGUnXSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbJ3RlbXBsYXRlJ10sXG4gICAgICBwcm92aWRlcnM6IGFycmF5RnJvbUpzb24oZGF0YVsncHJvdmlkZXJzJ10sIENvbXBpbGVQcm92aWRlck1ldGFkYXRhLmZyb21Kc29uKVxuICAgIH0pO1xuICB9XG5cbiAgdG9Kc29uKCk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2NsYXNzJzogJ0RpcmVjdGl2ZScsXG4gICAgICAnaXNDb21wb25lbnQnOiB0aGlzLmlzQ29tcG9uZW50LFxuICAgICAgJ2R5bmFtaWNMb2FkYWJsZSc6IHRoaXMuZHluYW1pY0xvYWRhYmxlLFxuICAgICAgJ3NlbGVjdG9yJzogdGhpcy5zZWxlY3RvcixcbiAgICAgICdleHBvcnRBcyc6IHRoaXMuZXhwb3J0QXMsXG4gICAgICAndHlwZSc6IGlzUHJlc2VudCh0aGlzLnR5cGUpID8gdGhpcy50eXBlLnRvSnNvbigpIDogdGhpcy50eXBlLFxuICAgICAgJ2NoYW5nZURldGVjdGlvbic6IGlzUHJlc2VudCh0aGlzLmNoYW5nZURldGVjdGlvbikgPyBzZXJpYWxpemVFbnVtKHRoaXMuY2hhbmdlRGV0ZWN0aW9uKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLFxuICAgICAgJ2lucHV0cyc6IHRoaXMuaW5wdXRzLFxuICAgICAgJ291dHB1dHMnOiB0aGlzLm91dHB1dHMsXG4gICAgICAnaG9zdExpc3RlbmVycyc6IHRoaXMuaG9zdExpc3RlbmVycyxcbiAgICAgICdob3N0UHJvcGVydGllcyc6IHRoaXMuaG9zdFByb3BlcnRpZXMsXG4gICAgICAnaG9zdEF0dHJpYnV0ZXMnOiB0aGlzLmhvc3RBdHRyaWJ1dGVzLFxuICAgICAgJ2xpZmVjeWNsZUhvb2tzJzogdGhpcy5saWZlY3ljbGVIb29rcy5tYXAoaG9vayA9PiBzZXJpYWxpemVFbnVtKGhvb2spKSxcbiAgICAgICd0ZW1wbGF0ZSc6IGlzUHJlc2VudCh0aGlzLnRlbXBsYXRlKSA/IHRoaXMudGVtcGxhdGUudG9Kc29uKCkgOiB0aGlzLnRlbXBsYXRlLFxuICAgICAgJ3Byb3ZpZGVycyc6IGFycmF5VG9Kc29uKHRoaXMucHJvdmlkZXJzKVxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBDb25zdHJ1Y3Qge0BsaW5rIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YX0gZnJvbSB7QGxpbmsgQ29tcG9uZW50VHlwZU1ldGFkYXRhfSBhbmQgYSBzZWxlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhvc3RDb21wb25lbnRNZXRhKGNvbXBvbmVudFR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50U2VsZWN0b3I6IHN0cmluZyk6IENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSB7XG4gIHZhciB0ZW1wbGF0ZSA9IENzc1NlbGVjdG9yLnBhcnNlKGNvbXBvbmVudFNlbGVjdG9yKVswXS5nZXRNYXRjaGluZ0VsZW1lbnRUZW1wbGF0ZSgpO1xuICByZXR1cm4gQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLmNyZWF0ZSh7XG4gICAgdHlwZTogbmV3IENvbXBpbGVUeXBlTWV0YWRhdGEoe1xuICAgICAgcnVudGltZTogT2JqZWN0LFxuICAgICAgbmFtZTogYEhvc3Qke2NvbXBvbmVudFR5cGUubmFtZX1gLFxuICAgICAgbW9kdWxlVXJsOiBjb21wb25lbnRUeXBlLm1vZHVsZVVybCxcbiAgICAgIGlzSG9zdDogdHJ1ZVxuICAgIH0pLFxuICAgIHRlbXBsYXRlOiBuZXcgQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEoXG4gICAgICAgIHt0ZW1wbGF0ZTogdGVtcGxhdGUsIHRlbXBsYXRlVXJsOiAnJywgc3R5bGVzOiBbXSwgc3R5bGVVcmxzOiBbXSwgbmdDb250ZW50U2VsZWN0b3JzOiBbXX0pLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBpbnB1dHM6IFtdLFxuICAgIG91dHB1dHM6IFtdLFxuICAgIGhvc3Q6IHt9LFxuICAgIGxpZmVjeWNsZUhvb2tzOiBbXSxcbiAgICBpc0NvbXBvbmVudDogdHJ1ZSxcbiAgICBkeW5hbWljTG9hZGFibGU6IGZhbHNlLFxuICAgIHNlbGVjdG9yOiAnKicsXG4gICAgcHJvdmlkZXJzOiBbXSxcbiAgICB2aWV3UHJvdmlkZXJzOiBbXSxcbiAgICBxdWVyaWVzOiBbXSxcbiAgICB2aWV3UXVlcmllczogW11cbiAgfSk7XG59XG5cblxuZXhwb3J0IGNsYXNzIENvbXBpbGVQaXBlTWV0YWRhdGEgaW1wbGVtZW50cyBDb21waWxlTWV0YWRhdGFXaXRoVHlwZSB7XG4gIHR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGE7XG4gIG5hbWU6IHN0cmluZztcbiAgcHVyZTogYm9vbGVhbjtcbiAgY29uc3RydWN0b3Ioe3R5cGUsIG5hbWUsXG4gICAgICAgICAgICAgICBwdXJlfToge3R5cGU/OiBDb21waWxlVHlwZU1ldGFkYXRhLCBuYW1lPzogc3RyaW5nLCBwdXJlPzogYm9vbGVhbn0gPSB7fSkge1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnB1cmUgPSBub3JtYWxpemVCb29sKHB1cmUpO1xuICB9XG4gIGdldCBpZGVudGlmaWVyKCk6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEgeyByZXR1cm4gdGhpcy50eXBlOyB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogQ29tcGlsZVBpcGVNZXRhZGF0YSB7XG4gICAgcmV0dXJuIG5ldyBDb21waWxlUGlwZU1ldGFkYXRhKHtcbiAgICAgIHR5cGU6IGlzUHJlc2VudChkYXRhWyd0eXBlJ10pID8gQ29tcGlsZVR5cGVNZXRhZGF0YS5mcm9tSnNvbihkYXRhWyd0eXBlJ10pIDogZGF0YVsndHlwZSddLFxuICAgICAgbmFtZTogZGF0YVsnbmFtZSddLFxuICAgICAgcHVyZTogZGF0YVsncHVyZSddXG4gICAgfSk7XG4gIH1cblxuICB0b0pzb24oKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgIHJldHVybiB7XG4gICAgICAnY2xhc3MnOiAnUGlwZScsXG4gICAgICAndHlwZSc6IGlzUHJlc2VudCh0aGlzLnR5cGUpID8gdGhpcy50eXBlLnRvSnNvbigpIDogbnVsbCxcbiAgICAgICduYW1lJzogdGhpcy5uYW1lLFxuICAgICAgJ3B1cmUnOiB0aGlzLnB1cmVcbiAgICB9O1xuICB9XG59XG5cbnZhciBfQ09NUElMRV9NRVRBREFUQV9GUk9NX0pTT04gPSB7XG4gICdEaXJlY3RpdmUnOiBDb21waWxlRGlyZWN0aXZlTWV0YWRhdGEuZnJvbUpzb24sXG4gICdQaXBlJzogQ29tcGlsZVBpcGVNZXRhZGF0YS5mcm9tSnNvbixcbiAgJ1R5cGUnOiBDb21waWxlVHlwZU1ldGFkYXRhLmZyb21Kc29uLFxuICAnSWRlbnRpZmllcic6IENvbXBpbGVJZGVudGlmaWVyTWV0YWRhdGEuZnJvbUpzb25cbn07XG5cbmZ1bmN0aW9uIGFycmF5RnJvbUpzb24ob2JqOiBhbnlbXSwgZm46IChhOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4gYW55KTogYW55IHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IG51bGwgOiBvYmoubWFwKGZuKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlUb0pzb24ob2JqOiBhbnlbXSk6IHN0cmluZyB8IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgcmV0dXJuIGlzQmxhbmsob2JqKSA/IG51bGwgOiBvYmoubWFwKG8gPT4gby50b0pzb24oKSk7XG59XG5cbmZ1bmN0aW9uIG9iakZyb21Kc29uKG9iajogYW55LCBmbjogKGE6IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiBhbnkpOiBhbnkge1xuICByZXR1cm4gKGlzU3RyaW5nKG9iaikgfHwgaXNCbGFuayhvYmopKSA/IG9iaiA6IGZuKG9iaik7XG59XG5cbmZ1bmN0aW9uIG9ialRvSnNvbihvYmo6IGFueSk6IHN0cmluZyB8IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgcmV0dXJuIChpc1N0cmluZyhvYmopIHx8IGlzQmxhbmsob2JqKSkgPyBvYmogOiBvYmoudG9Kc29uKCk7XG59Il19