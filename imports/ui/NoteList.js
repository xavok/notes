/**
 * Created by Xavok on 4/9/2017.
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '/imports/api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends React.Component {
    renderItems() {
        if(this.props.notes.length) {
            return this.props.notes.map((note) => {
                return <NoteListItem note={note} key={note._id}/>
            });
        } else {
            return <NoteListEmptyItem/>;
        }
    }

    render() {
        return (
            <div>
                <NoteListHeader/>
                {this.renderItems()}
                NoteList { this.props.notes.length }
            </div>
        )
    }
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