import React from "react";

class CreateTodo extends React.Component {
    constructor(props) {
        super(props)
    }
    
    submit = (event) => {
        const title = event.target[0].value
        event.preventDefault()
        this.props.onTodoSubmitted(title)
        event.target[0].value = ''
    }
    
    render() {
        return (
            // {this.props.children}
            <form onSubmit={this.submit}>
                <div>
                    <input type="text" name="title" placeholder="Title..." />
                </div>
                <input type="submit" value="Add" />
            </form>
        )
    }
}

export default CreateTodo