TODO:
- Watch if SCSS or JS file changes
- If changes, then need to touch *.csproj
- AfterBuild event 
- Will cause request for dotnet watch to reload (csproj file changed)


Scoped Razor CSS

{ASSEMBLY NAME}.styles.css
<-- {RAZOR_FILE_x}.razor.css 
    <-- {RAZOR_FILE_x}.razor.scss