import React from 'react';
const Cards = (props)=> {
    console.log(props)
    return (
        <div>
            <p>id:{props.post[0]?.id}</p>
            <p>name:{props.post[0]?.name}</p>
            <p>email:{props.post[0]?.email}</p>
        </div>
    );
}

export default Cards;