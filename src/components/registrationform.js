import React,{Component} from 'react';

import * as FontAwesome from 'react-icons/lib/fa'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email:'',
          username: '',
          password: '',
          passwordConfirm: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
      handleChange(e) {
        e.target.classList.add('active');
        
        this.setState({
          [e.target.name]: e.target.value
        });
        
        this.showInputError(e.target.name);
      }
      
      handleSubmit(e) {    
        e.preventDefault();
        
        console.log('component state', JSON.stringify(this.state));
        
        if (!this.showFormErrors()) {
          console.log('form is invalid: do not submit');
        } else {
          console.log('form is valid: submit');
        }
      }
      
      showFormErrors() {
        const inputs = document.querySelectorAll('input.requiredFiled');
        let isFormValid = true;
        
        inputs.forEach(input => {
          input.classList.add('active');
          
          const isInputValid = this.showInputError(input.name);
          
          if (!isInputValid) {
            isFormValid = false;
          }
        });
        
        return isFormValid;
      }
      
      showInputError(refName) {
        const validity = this.refs[refName].validity;
        const label= refName;
        const error = document.getElementById(`${refName}Error`);
        const isPassword = refName.indexOf('password') !== -1;
        const isPasswordConfirm = refName === 'passwordConfirm';
        
        if (isPasswordConfirm) {
          if (this.refs.password.value !== this.refs.passwordConfirm.value) {
            this.refs.passwordConfirm.setCustomValidity('Passwords do not match');
          } else {
            this.refs.passwordConfirm.setCustomValidity('');
          }
        }
            
        if (!validity.valid) {
          if (validity.valueMissing) {
            error.textContent = `${label} is a required field`; 
          } else if (validity.typeMismatch) {
            error.textContent = `${label} should be a valid email address`; 
          } else if (isPasswordConfirm && validity.customError) {
            error.textContent = 'Passwords do not match';
          }
          return false;
        }
        
        error.textContent = '';
        return true;
      }
    
      render() {
        return (
          <main>
            <article>
                <section>
                    <form className='registrationform'>
                        <hgroup>
                            <h2>Register</h2>
                            <h5>Join the community and improve your game with ANGLR</h5>                                 
                        </hgroup>
                        <div className="inputfield">
                        <span><FontAwesome.FaUser /></span>
                        <input 
                           type="text" 
                           ref="fname" 
                           name="firstname" 
                           placeholder="First Name"/>
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaUser /></span>
                        <input 
                           type="text" 
                           ref="lname" 
                           name="lastname" 
                           placeholder="Last name"/>
                        </div>                 
                        <div className="inputfield">
                        <span><FontAwesome.FaMapMarker /></span>
                        <input 
                           type="text" 
                           ref="zip" 
                           name="zipcode" 
                           placeholder="Zip Code"/>
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaEnvelope /></span>
                        <input 
                           type="email" 
                           ref="email" 
                           name="email" 
                           className="requiredFiled"
                           placeholder="Email" 
                           value={this.state.email} 
                           onChange={this.handleChange} 
                           required/> 
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaUser /></span>
                        <input 
                           type="text" 
                           ref="username" 
                           name="username"
                           className="requiredFiled" 
                           placeholder="Username" 
                           value={this.state.username}
                           onChange={this.handleChange} 
                           required/>
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaUnlockAlt /></span>
                        <input 
                           type="password" 
                           ref="password" 
                           name="password"
                           className="requiredFiled" 
                           placeholder="Password" 
                           value={this.state.password}
                           onChange={this.handleChange} 
                           required/>
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaLock /></span>
                        <input 
                           type="password" 
                           ref="passwordConfirm" 
                           name="passwordConfirm" 
                           className="requiredFiled"
                           placeholder="Confirm Password" 
                           value={this.state.passwordConfirm}
                           onChange={this.handleChange} 
                           required/>
                        </div>          
                        <p>By registering you agree to our <strong>Terms</strong> and <strong>Privacy Policy</strong></p>
                        <div className="errorSection">
                         <div className="error" id="emailError" />
                         <div className="error" id="usernameError" />
                         <div className="error" id="passwordError" />
                         <div className="error" id="passwordConfirmError" />
                      </div> 
                      <input type="submit" value="Register" onClick={ this.handleSubmit }/>
                      
                        <hr/>
                        <p>Already have an account? <strong>SIGN IN</strong></p>
                    </form>
                </section>
            </article>
          </main>
        );
      }
  }
 
  
export default RegistrationForm;
