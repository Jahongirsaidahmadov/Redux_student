const initialState = [
    {
        id: 0,
        name: 'Jahongir S',
        email: 's@g.com',
        number: 1234,
    },
    {
        id: 1,
        name: 'Samandar S',
        email: 'j@g.com',
        number: 4321,
    },
]

const contactReducer = (state = initialState, action) => {
    switch (action.type){
        case "ADD_CONTACT":
            state = [...state, action.payload];
            return state;
        case 'UPDATE_CONTACT':
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact)
            state = updateState;
            return state;
        case 'DELETE_CONTACT':
            const filterContact = state.filter(contact => contact.id !== action.payload && contact)
            state = filterContact;
            return state;
        default:
            return state
    }
}
export default contactReducer;