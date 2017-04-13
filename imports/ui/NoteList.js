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
import {Session} from 'meteor/session';

export class NoteList extends React.Component {
    renderItems() {
        if (this.props.notes.length) {
            return this.props.notes.map((note) => {
                return <NoteListItem note={note} key={note._id}/>
            });
        } else {
            return <NoteListEmptyItem/>;
        }
    }

    render() {
        return (
            <div className="item-list">
                <NoteListHeader/>
                {this.renderItems()}
            </div>
        )
    }
}

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map((note) => {
            return {
                ...note,
                selected: note._id === selectedNoteId
            }
        })
    };
}, NoteList);