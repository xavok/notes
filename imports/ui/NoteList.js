/**
 * Created by Xavok on 4/9/2017.
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '/imports/api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
export const NoteList = (props) => {
    return(
        <div>
            <NoteListHeader/>
            {
                props.notes.map((note) => {
                    return <NoteListItem note={note} key={note._id}/>
                })
            }
            NoteList { props.notes.length }
        </div>
    )
};
NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
}, NoteList);