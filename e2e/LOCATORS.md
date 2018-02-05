# Protractor Locators (Selectors)

The most used:

```
$('#some-id')
```

or

```
element(by.id('some-id'))
```

The $ is not a jQuery selector, but a shorthanded version of element(by.css('#some-id')). In this fashion, we’d be able to select elements by id, class and attributes:

```
$('.some-class')             // element(by.className())
$('tag-name')                // element(by.tagName())
$('[ng-message=required]')   // remember to leave out the double quotes around the value of attribute
$('#parent #child')          // select one child inside parent
$('ul li')                   // select all children inside parent
$('ul li').first()           // select first of children
$('ul li').last()            // select last of children
$('ul li').get(index)        // select index-th of children
```

Then we get the more interesting ones:

```
element(by.model('data'));
element(by.repeater('cat in pets'));
element(by.options('c for c in colors'))
element(by.binding('value'));           // only look through the elements with ng-binding attribute
element(by.buttonText('Save'));         // the whole of button text
element(by.partialButtonText('Save'));  // part of button text
element(by.cssContainingText('.pet', 'Dog')) // for selecting this: <li class="pet">Dog</li>
element(by.deepCss('span'))             // for selecting all level of spans <span><span>x</span></span>
```
