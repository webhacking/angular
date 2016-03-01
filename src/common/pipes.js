'use strict';/**
 * @module
 * @description
 * This module provides a set of common Pipes.
 */
var async_pipe_1 = require('./pipes/async_pipe');
var uppercase_pipe_1 = require('./pipes/uppercase_pipe');
var lowercase_pipe_1 = require('./pipes/lowercase_pipe');
var json_pipe_1 = require('./pipes/json_pipe');
var slice_pipe_1 = require('./pipes/slice_pipe');
var date_pipe_1 = require('./pipes/date_pipe');
var number_pipe_1 = require('./pipes/number_pipe');
var replace_pipe_1 = require('./pipes/replace_pipe');
var lang_1 = require('angular2/src/facade/lang');
var async_pipe_2 = require('./pipes/async_pipe');
exports.AsyncPipe = async_pipe_2.AsyncPipe;
var date_pipe_2 = require('./pipes/date_pipe');
exports.DatePipe = date_pipe_2.DatePipe;
var json_pipe_2 = require('./pipes/json_pipe');
exports.JsonPipe = json_pipe_2.JsonPipe;
var slice_pipe_2 = require('./pipes/slice_pipe');
exports.SlicePipe = slice_pipe_2.SlicePipe;
var lowercase_pipe_2 = require('./pipes/lowercase_pipe');
exports.LowerCasePipe = lowercase_pipe_2.LowerCasePipe;
var number_pipe_2 = require('./pipes/number_pipe');
exports.NumberPipe = number_pipe_2.NumberPipe;
exports.DecimalPipe = number_pipe_2.DecimalPipe;
exports.PercentPipe = number_pipe_2.PercentPipe;
exports.CurrencyPipe = number_pipe_2.CurrencyPipe;
var uppercase_pipe_2 = require('./pipes/uppercase_pipe');
exports.UpperCasePipe = uppercase_pipe_2.UpperCasePipe;
var replace_pipe_2 = require('./pipes/replace_pipe');
exports.ReplacePipe = replace_pipe_2.ReplacePipe;
/**
 * A collection of Angular core pipes that are likely to be used in each and every
 * application.
 *
 * This collection can be used to quickly enumerate all the built-in pipes in the `pipes`
 * property of the `@Component` or `@View` decorators.
 */
exports.COMMON_PIPES = lang_1.CONST_EXPR([
    async_pipe_1.AsyncPipe,
    uppercase_pipe_1.UpperCasePipe,
    lowercase_pipe_1.LowerCasePipe,
    json_pipe_1.JsonPipe,
    slice_pipe_1.SlicePipe,
    number_pipe_1.DecimalPipe,
    number_pipe_1.PercentPipe,
    number_pipe_1.CurrencyPipe,
    date_pipe_1.DatePipe,
    replace_pipe_1.ReplacePipe
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29tbW9uL3BpcGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCwyQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUM3QywrQkFBNEIsd0JBQXdCLENBQUMsQ0FBQTtBQUNyRCwrQkFBNEIsd0JBQXdCLENBQUMsQ0FBQTtBQUNyRCwwQkFBdUIsbUJBQW1CLENBQUMsQ0FBQTtBQUMzQywyQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUM3QywwQkFBdUIsbUJBQW1CLENBQUMsQ0FBQTtBQUMzQyw0QkFBcUQscUJBQXFCLENBQUMsQ0FBQTtBQUMzRSw2QkFBMEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNqRCxxQkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUVwRCwyQkFBd0Isb0JBQW9CLENBQUM7QUFBckMsMkNBQXFDO0FBQzdDLDBCQUF1QixtQkFBbUIsQ0FBQztBQUFuQyx3Q0FBbUM7QUFDM0MsMEJBQXVCLG1CQUFtQixDQUFDO0FBQW5DLHdDQUFtQztBQUMzQywyQkFBd0Isb0JBQW9CLENBQUM7QUFBckMsMkNBQXFDO0FBQzdDLCtCQUE0Qix3QkFBd0IsQ0FBQztBQUE3Qyx1REFBNkM7QUFDckQsNEJBQWlFLHFCQUFxQixDQUFDO0FBQS9FLDhDQUFVO0FBQUUsZ0RBQVc7QUFBRSxnREFBVztBQUFFLGtEQUF5QztBQUN2RiwrQkFBNEIsd0JBQXdCLENBQUM7QUFBN0MsdURBQTZDO0FBQ3JELDZCQUEwQixzQkFBc0IsQ0FBQztBQUF6QyxpREFBeUM7QUFFakQ7Ozs7OztHQU1HO0FBQ1Usb0JBQVksR0FBRyxpQkFBVSxDQUFDO0lBQ3JDLHNCQUFTO0lBQ1QsOEJBQWE7SUFDYiw4QkFBYTtJQUNiLG9CQUFRO0lBQ1Isc0JBQVM7SUFDVCx5QkFBVztJQUNYLHlCQUFXO0lBQ1gsMEJBQVk7SUFDWixvQkFBUTtJQUNSLDBCQUFXO0NBQ1osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbW9kdWxlXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgbW9kdWxlIHByb3ZpZGVzIGEgc2V0IG9mIGNvbW1vbiBQaXBlcy5cbiAqL1xuaW1wb3J0IHtBc3luY1BpcGV9IGZyb20gJy4vcGlwZXMvYXN5bmNfcGlwZSc7XG5pbXBvcnQge1VwcGVyQ2FzZVBpcGV9IGZyb20gJy4vcGlwZXMvdXBwZXJjYXNlX3BpcGUnO1xuaW1wb3J0IHtMb3dlckNhc2VQaXBlfSBmcm9tICcuL3BpcGVzL2xvd2VyY2FzZV9waXBlJztcbmltcG9ydCB7SnNvblBpcGV9IGZyb20gJy4vcGlwZXMvanNvbl9waXBlJztcbmltcG9ydCB7U2xpY2VQaXBlfSBmcm9tICcuL3BpcGVzL3NsaWNlX3BpcGUnO1xuaW1wb3J0IHtEYXRlUGlwZX0gZnJvbSAnLi9waXBlcy9kYXRlX3BpcGUnO1xuaW1wb3J0IHtEZWNpbWFsUGlwZSwgUGVyY2VudFBpcGUsIEN1cnJlbmN5UGlwZX0gZnJvbSAnLi9waXBlcy9udW1iZXJfcGlwZSc7XG5pbXBvcnQge1JlcGxhY2VQaXBlfSBmcm9tICcuL3BpcGVzL3JlcGxhY2VfcGlwZSc7XG5pbXBvcnQge0NPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmV4cG9ydCB7QXN5bmNQaXBlfSBmcm9tICcuL3BpcGVzL2FzeW5jX3BpcGUnO1xuZXhwb3J0IHtEYXRlUGlwZX0gZnJvbSAnLi9waXBlcy9kYXRlX3BpcGUnO1xuZXhwb3J0IHtKc29uUGlwZX0gZnJvbSAnLi9waXBlcy9qc29uX3BpcGUnO1xuZXhwb3J0IHtTbGljZVBpcGV9IGZyb20gJy4vcGlwZXMvc2xpY2VfcGlwZSc7XG5leHBvcnQge0xvd2VyQ2FzZVBpcGV9IGZyb20gJy4vcGlwZXMvbG93ZXJjYXNlX3BpcGUnO1xuZXhwb3J0IHtOdW1iZXJQaXBlLCBEZWNpbWFsUGlwZSwgUGVyY2VudFBpcGUsIEN1cnJlbmN5UGlwZX0gZnJvbSAnLi9waXBlcy9udW1iZXJfcGlwZSc7XG5leHBvcnQge1VwcGVyQ2FzZVBpcGV9IGZyb20gJy4vcGlwZXMvdXBwZXJjYXNlX3BpcGUnO1xuZXhwb3J0IHtSZXBsYWNlUGlwZX0gZnJvbSAnLi9waXBlcy9yZXBsYWNlX3BpcGUnO1xuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBBbmd1bGFyIGNvcmUgcGlwZXMgdGhhdCBhcmUgbGlrZWx5IHRvIGJlIHVzZWQgaW4gZWFjaCBhbmQgZXZlcnlcbiAqIGFwcGxpY2F0aW9uLlxuICpcbiAqIFRoaXMgY29sbGVjdGlvbiBjYW4gYmUgdXNlZCB0byBxdWlja2x5IGVudW1lcmF0ZSBhbGwgdGhlIGJ1aWx0LWluIHBpcGVzIGluIHRoZSBgcGlwZXNgXG4gKiBwcm9wZXJ0eSBvZiB0aGUgYEBDb21wb25lbnRgIG9yIGBAVmlld2AgZGVjb3JhdG9ycy5cbiAqL1xuZXhwb3J0IGNvbnN0IENPTU1PTl9QSVBFUyA9IENPTlNUX0VYUFIoW1xuICBBc3luY1BpcGUsXG4gIFVwcGVyQ2FzZVBpcGUsXG4gIExvd2VyQ2FzZVBpcGUsXG4gIEpzb25QaXBlLFxuICBTbGljZVBpcGUsXG4gIERlY2ltYWxQaXBlLFxuICBQZXJjZW50UGlwZSxcbiAgQ3VycmVuY3lQaXBlLFxuICBEYXRlUGlwZSxcbiAgUmVwbGFjZVBpcGVcbl0pO1xuIl19