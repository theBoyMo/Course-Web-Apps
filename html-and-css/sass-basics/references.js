/*
	References:
	[1] http://sass-lang.com/guide
	[2] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_
	[3] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax
	[4] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass
	[5] http://sassbreak.com/ruby-sass-libsass-differences/
	[6] http://sassbreak.com/watch-your-sass/
	[7] https://www.sassmeister.com/
	[8] https://codekitapp.com/
	[9] http://scout-app.io/
	[10] http://koala-app.com/
	[11] https://coryetzkorn.com/blog/color-variables-in-sass/
	[12] http://thesassway.com/beginner/variable-naming
	[13] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#nested_rules
	[14] http://thesassway.com/beginner/the-inception-rule
	[15] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector
	[16] http://blog.teamtreehouse.com/sass-tip-double-ampersand-selector
	[17] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins
	[18] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixin-content
	[19] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#extend
	[20] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_
	[21] http://sass-lang.com/documentation/file.SASS_REFERENCE.html#comments
	
	compiling single sass file to css:
	$ sass input.scss:output.css
	
	you can have sass automatically update your sass files when any changes are saved with the watch command
	$ sass --watch input.scss:output.css
	
	you can automatically combine multiple sass files into a single css file by watching the sass folder
	$ sass --watch scss:css
 
 
	Mixins allow you to declare styles that can be referenced in other parts of your style sheet
	1. create the mixin with the @mixin directive
	2. include the mixin inside other rules with the @include directive followed by the mixin name
		- must be declared before called, wither at the top of the style sheet or in a separate file.
	
	Content directive allows you to pass values to mixins, allowing you to use the same mixin in different locations. Add @content to the mixin definition, add {} with the content to the @include statement, following it's name.
	
	Extend Directive allows you to share snippets of code across your style sheets.
	
	Placeholder selectors are used for those selectors that do not appear in the html, thus not referenced directly, only used by sass, e.g with extend directives - create a placeholder selector to reference the styles common to two or more selectors, reference the placeholder selector in the style sheet with the @extend directive.
	
	Comments - single line comments defined with // DO NOT appear in the css output
	
 
 */