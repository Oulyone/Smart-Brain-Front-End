import React, { useEffect, useState } from 'react';

function Register (props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         password: '',
    //         name: ''
    //     }
    // }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onNameChange = (event) => {
        // this.setState({name: event.target.value})
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        // this.setState({email: event.target.value})
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        // this.setState({password: event.target.value})
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {
        fetch('https://smart-brain-api-qha4.onrender.com/register', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    props.loadUser(user)
                    props.onRouteChange('home');
                } else {
                    alert(user)
                }
            })
    }

    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("Enter key was pressed. Run your function.");
                event.preventDefault();
                onSubmitSignIn();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      });
    
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="name" 
                                id="name"
                                onChange={onNameChange}>
                            </input>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={onEmailChange}>
                            </input>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={onPasswordChange}>
                            </input>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register">
                        </input>
                    </div>
                </div>
            </main>
        </article>
    )
}

export default Register;