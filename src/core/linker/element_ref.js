'use strict';var exceptions_1 = require('angular2/src/facade/exceptions');
/**
 * Represents a location in a View that has an injection, change-detection and render context
 * associated with it.
 *
 * An `ElementRef` is created for each element in the Template that contains a Directive, Component
 * or data-binding.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 */
var ElementRef = (function () {
    function ElementRef() {
    }
    Object.defineProperty(ElementRef.prototype, "nativeElement", {
        /**
         * The underlying native element or `null` if direct access to native elements is not supported
         * (e.g. when the application runs in a web worker).
         *
         * <div class="callout is-critical">
         *   <header>Use with caution</header>
         *   <p>
         *    Use this API as the last resort when direct access to DOM is needed. Use templating and
         *    data-binding provided by Angular instead. Alternatively you take a look at {@link Renderer}
         *    which provides API that can safely be used even when direct access to native elements is not
         *    supported.
         *   </p>
         *   <p>
         *    Relying on direct DOM access creates tight coupling between your application and rendering
         *    layers which will make it impossible to separate the two and deploy your application into a
         *    web worker.
         *   </p>
         * </div>
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return ElementRef;
})();
exports.ElementRef = ElementRef;
var ElementRef_ = (function () {
    function ElementRef_(_appElement) {
        this._appElement = _appElement;
    }
    Object.defineProperty(ElementRef_.prototype, "internalElement", {
        get: function () { return this._appElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementRef_.prototype, "nativeElement", {
        get: function () { return this._appElement.nativeElement; },
        enumerable: true,
        configurable: true
    });
    return ElementRef_;
})();
exports.ElementRef_ = ElementRef_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudF9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvZWxlbWVudF9yZWYudHMiXSwibmFtZXMiOlsiRWxlbWVudFJlZiIsIkVsZW1lbnRSZWYuY29uc3RydWN0b3IiLCJFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQiLCJFbGVtZW50UmVmXyIsIkVsZW1lbnRSZWZfLmNvbnN0cnVjdG9yIiwiRWxlbWVudFJlZl8uaW50ZXJuYWxFbGVtZW50IiwiRWxlbWVudFJlZl8ubmF0aXZlRWxlbWVudCJdLCJtYXBwaW5ncyI6IkFBQUEsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFJN0Q7Ozs7Ozs7OztHQVNHO0FBQ0g7SUFBQUE7SUFxQkFDLENBQUNBO0lBRENELHNCQUFJQSxxQ0FBYUE7UUFuQmpCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBa0JHQTthQUNIQSxjQUEyQkUsTUFBTUEsQ0FBQ0EsMEJBQWFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBOzs7T0FBQUY7SUFDdERBLGlCQUFDQTtBQUFEQSxDQUFDQSxBQXJCRCxJQXFCQztBQXJCcUIsa0JBQVUsYUFxQi9CLENBQUE7QUFFRDtJQUNFRyxxQkFBb0JBLFdBQXVCQTtRQUF2QkMsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQVlBO0lBQUdBLENBQUNBO0lBRS9DRCxzQkFBSUEsd0NBQWVBO2FBQW5CQSxjQUFvQ0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7OztPQUFBRjtJQUU5REEsc0JBQUlBLHNDQUFhQTthQUFqQkEsY0FBc0JHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLENBQUNBOzs7T0FBQUg7SUFDaEVBLGtCQUFDQTtBQUFEQSxDQUFDQSxBQU5ELElBTUM7QUFOWSxtQkFBVyxjQU12QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt1bmltcGxlbWVudGVkfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge0FwcEVsZW1lbnR9IGZyb20gJy4vZWxlbWVudCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGxvY2F0aW9uIGluIGEgVmlldyB0aGF0IGhhcyBhbiBpbmplY3Rpb24sIGNoYW5nZS1kZXRlY3Rpb24gYW5kIHJlbmRlciBjb250ZXh0XG4gKiBhc3NvY2lhdGVkIHdpdGggaXQuXG4gKlxuICogQW4gYEVsZW1lbnRSZWZgIGlzIGNyZWF0ZWQgZm9yIGVhY2ggZWxlbWVudCBpbiB0aGUgVGVtcGxhdGUgdGhhdCBjb250YWlucyBhIERpcmVjdGl2ZSwgQ29tcG9uZW50XG4gKiBvciBkYXRhLWJpbmRpbmcuXG4gKlxuICogQW4gYEVsZW1lbnRSZWZgIGlzIGJhY2tlZCBieSBhIHJlbmRlci1zcGVjaWZpYyBlbGVtZW50LiBJbiB0aGUgYnJvd3NlciwgdGhpcyBpcyB1c3VhbGx5IGEgRE9NXG4gKiBlbGVtZW50LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRWxlbWVudFJlZiB7XG4gIC8qKlxuICAgKiBUaGUgdW5kZXJseWluZyBuYXRpdmUgZWxlbWVudCBvciBgbnVsbGAgaWYgZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90IHN1cHBvcnRlZFxuICAgKiAoZS5nLiB3aGVuIHRoZSBhcHBsaWNhdGlvbiBydW5zIGluIGEgd2ViIHdvcmtlcikuXG4gICAqXG4gICAqIDxkaXYgY2xhc3M9XCJjYWxsb3V0IGlzLWNyaXRpY2FsXCI+XG4gICAqICAgPGhlYWRlcj5Vc2Ugd2l0aCBjYXV0aW9uPC9oZWFkZXI+XG4gICAqICAgPHA+XG4gICAqICAgIFVzZSB0aGlzIEFQSSBhcyB0aGUgbGFzdCByZXNvcnQgd2hlbiBkaXJlY3QgYWNjZXNzIHRvIERPTSBpcyBuZWVkZWQuIFVzZSB0ZW1wbGF0aW5nIGFuZFxuICAgKiAgICBkYXRhLWJpbmRpbmcgcHJvdmlkZWQgYnkgQW5ndWxhciBpbnN0ZWFkLiBBbHRlcm5hdGl2ZWx5IHlvdSB0YWtlIGEgbG9vayBhdCB7QGxpbmsgUmVuZGVyZXJ9XG4gICAqICAgIHdoaWNoIHByb3ZpZGVzIEFQSSB0aGF0IGNhbiBzYWZlbHkgYmUgdXNlZCBldmVuIHdoZW4gZGlyZWN0IGFjY2VzcyB0byBuYXRpdmUgZWxlbWVudHMgaXMgbm90XG4gICAqICAgIHN1cHBvcnRlZC5cbiAgICogICA8L3A+XG4gICAqICAgPHA+XG4gICAqICAgIFJlbHlpbmcgb24gZGlyZWN0IERPTSBhY2Nlc3MgY3JlYXRlcyB0aWdodCBjb3VwbGluZyBiZXR3ZWVuIHlvdXIgYXBwbGljYXRpb24gYW5kIHJlbmRlcmluZ1xuICAgKiAgICBsYXllcnMgd2hpY2ggd2lsbCBtYWtlIGl0IGltcG9zc2libGUgdG8gc2VwYXJhdGUgdGhlIHR3byBhbmQgZGVwbG95IHlvdXIgYXBwbGljYXRpb24gaW50byBhXG4gICAqICAgIHdlYiB3b3JrZXIuXG4gICAqICAgPC9wPlxuICAgKiA8L2Rpdj5cbiAgICovXG4gIGdldCBuYXRpdmVFbGVtZW50KCk6IGFueSB7IHJldHVybiB1bmltcGxlbWVudGVkKCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRSZWZfIGltcGxlbWVudHMgRWxlbWVudFJlZiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FwcEVsZW1lbnQ6IEFwcEVsZW1lbnQpIHt9XG5cbiAgZ2V0IGludGVybmFsRWxlbWVudCgpOiBBcHBFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2FwcEVsZW1lbnQ7IH1cblxuICBnZXQgbmF0aXZlRWxlbWVudCgpIHsgcmV0dXJuIHRoaXMuX2FwcEVsZW1lbnQubmF0aXZlRWxlbWVudDsgfVxufVxuIl19