import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Login} from './Login';

if (Meteor.isClient) {
    describe('Login', function () {

        it('should show error messages', function () {
            const error = 'This is not working';
            const wrapper = mount(<Login loginWithPassword={() => {
            }}/>);

            wrapper.setState({error});
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('should call loginWithPassword with the form data', function () {
            const email = 'test@gmail.com';
            const pass = 'password';
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy} />);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = pass;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({email});
            expect(spy.calls[0].arguments[1]).toBe(pass);

        });

        it('should set loginWithPassword callback errors', function () {
            const spy = expect.createSpy();
            const wrapper = mount(<Login loginWithPassword={spy} />);
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error')).toNotBe('');
            spy.calls[0].arguments[2]();
            expect(wrapper.state('error')).toBe('');
        });

    });
}
