/**
 * Created by Xavok on 4/10/2017.
 */
import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('NoteListHeader', function () {
        let meteorCall;
        let Session;

        beforeEach(function () {
            meteorCall = expect.createSpy(),
                Session = {
                    set: expect.createSpy()
                }
        });

        it('should call meteorCall on click', function () {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
        });

        it('should not set Session for failed insert',function() {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');
            meteorCall.calls[0].arguments[1]('aad', undefined);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toNotHaveBeenCalled();
        });

    });
}