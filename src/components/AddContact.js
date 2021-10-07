import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useHistory} from 'react-router'
import nextId from "react-id-generator";

const AddContact = () => {
    let htmlId = nextId();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    const contacts = useSelector((state) => state)
    const dispatch = useDispatch()

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkEmail = contacts.find(contact => contact.email === email && contact)
        const checkNumber = contacts.find(contact => contact.number === parseInt(number))

        if(!email || !number || !name){
            return toast.warning('Please fill in all fields')
        }
        if (checkEmail){
            return toast.error('This Email alredy exists')
        }
        if (checkNumber){
            return toast.error('This number alredy exist')
        }
        const data = {
            id: contacts[contacts.length-1].id+1,
            name,
            email,
            number,
        }
        dispatch({type: 'ADD_CONTACT', payload: data})
        toast.success('Styudent added sucsessfully')
        history.push('/')
    }

    return (
        <div className="container">
            <div className="row">
                <h1 className="display-3 text-center">
                    Add contact
                </h1>
                <div className="col-md-6 shadow mx-auto p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Name"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="form-control my-3"
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="number"
                                placeholder="Number"
                                className="form-control "
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="submit"
                                value="Add Student"
                                className="btn btn-block btn-dark mt-3"

                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddContact;