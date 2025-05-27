import {useState} from 'react'
import './App.css'
import Markdown from "marked-react";

interface BoxProperties {
    id: string,
    title: string
    value?: string

    setFullScreen(): void,

    write?(text: string): void
}

function Box(props: BoxProperties) {
    return (
        <div id={props.id} className="box">
            <div className="boxTitle">
                <div>
                    <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
                    {props.title}
                </div>
                <button onClick={() => props.setFullScreen()}>
                    <i className={"fa fa-arrows-alt"}></i>
                </button>
            </div>
            <div className="boxContent">
                {
                    props.id === "editorBox" ?
                        <textarea id={"editor"}
                            onChange={e => props.write && props.write(e.target.value)}
                            value={props.value}
                        ></textarea>
                        :
                        <div id={"preview"} className="mdWrapper">
                            <Markdown gfm={true} breaks={true} value={props.value}></Markdown>
                        </div>
                }
            </div>
        </div>
    )
}

const initialText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

function App() {
    const [editorDisplay, setEditorDisplay] = useState<boolean>(true);
    const [previewDisplay, setPreviewDisplay] = useState<boolean>(true);
    const [mdText, setMdText] = useState<string>(initialText);
    return (
        <>
            {editorDisplay &&
                <Box id="editorBox"
                     title="Editor"
                     setFullScreen={() => setPreviewDisplay(!previewDisplay)}
                     write={(text: string) => setMdText(text)}
                     value={mdText}/>}
            {previewDisplay &&
                <Box id="previewBox" title="Preview" setFullScreen={() => setEditorDisplay(!editorDisplay)}
                     value={mdText}/>}
        </>
    )
}

export default App
