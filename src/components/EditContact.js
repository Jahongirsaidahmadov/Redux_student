import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const EditContact = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    const {id} = useParams()

    const contacts = useSelector(state => state)
    const dispatch = useDispatch();
    const history = useHistory();
    const currentContact = contacts.find(contact => contact.id === parseInt(id))

    useEffect(()=> {
        if (currentContact){
         setName(currentContact.name)
         setEmail(currentContact.email)
         setNumber(currentContact.number)
        }
    }, [currentContact])

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

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
            id: parseInt(id),
            name,
            email,
            number,
        }
        dispatch({type: 'UPDATE_CONTACT', payload: data})
        toast.success('Styudent added sucsessfully')
        history.push('/')
    }

    return (
        <div className="container">
            {currentContact ? (
                <>
                    <div className="row">
                        <h1 className="display-3 text-center">
                            Edit Student {parseInt(id)+1}
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
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="input-group">
                                    <input
                                        type="number"
                                        placeholder="Number"
                                        className="form-control mb-3"
                                        value={number}
                                        onChange={e => setNumber(e.target.value)}
                                    />
                                </div>

                                <div className="input d-flex justify-content-around">
                                    <input type="submit" value="Update Student" className="btn btn-block btn-dark"/>
                                    <Link to="/" className="btn btn-danger ">
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                </>
            ) : (
                <h1 className="display-3 my-5 text-center">
                    Styudent Contact with {id} not exist
                </h1>
            )}

        </div>
    );
};

export default EditContact;