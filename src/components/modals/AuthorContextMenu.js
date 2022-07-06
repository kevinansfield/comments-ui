import React from 'react';
import AppContext from '../../AppContext';

class AuthorContextMenu extends React.Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {};

        this.deleteComment = this.deleteComment.bind(this);
    }

    deleteComment(event) {
        // todo
    }

    render() {
        return (
            <div class="flex flex-col">
                <button className="w-full mb-3 text-left">
                    Edit
                </button>
                <button className="w-full text-left" onClick={this.deleteComment}>
                    Delete
                </button>
            </div>
        );
    }
}
  
export default AuthorContextMenu;