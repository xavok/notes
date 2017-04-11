/**
 * Created by Xavok on 4/10/2017.
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';

const NoteListEmptyItem = () => {
    return (
        <div>
            <h5>You have no notes</h5>
            <p>Create a note to get started</p>
        </div>
    );
}

export default NoteListEmptyItem;