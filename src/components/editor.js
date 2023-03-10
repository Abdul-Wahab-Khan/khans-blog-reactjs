import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

class Editor extends React.Component {
    render() {
        return (
            <CKEditor
                editor={ClassicEditor}
                data="<p>testing</p>"
                onReady={e => console.log('started ', e)}
                onChange={(ev, ed) => console.log(ed.getData())} />
        )
    }
}

export default Editor