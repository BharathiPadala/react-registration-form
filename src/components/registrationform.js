import React,{Component} from 'react';

import * as FontAwesome from 'react-icons/lib/fa'

function contentClass(isShow) {
  if (isShow) {
    return "warning";
  }
  return "warning invisible";
}

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          email:'',
          username: '',
          password: '',
          confirmPassword: '',
          isShow: false
        };
        
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
                
      }
      
      handleChangeInput(e) {
        e.target.classList.add('active');
        
        this.setState({
          [e.target.name]: e.target.value
        });
        
        this.showInputError(e.target.name);
      }
      
      formSubmit(e) {    
        e.preventDefault();
        if (!this.showFormErrors()) {
          console.log('form is invalid:Please fill mandatory fields');
        }
        this.setState(function(prevState) {
          return {isShow: !prevState.isShow};
        });
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
        const isPasswordConfirm = refName === 'confirmPassword';
        
        if (isPasswordConfirm) {
          if (this.refs.password.value !== this.refs.confirmPassword.value) {
            this.refs.confirmPassword.setCustomValidity('Password and Confirm Password must be same');
          } else {
            this.refs.confirmPassword.setCustomValidity('');
          }
        }
            
        if (!validity.valid) {
          if (validity.valueMissing) {
            error.textContent = `${label} is a required field`; 
          } else if (validity.typeMismatch) {
            error.textContent = `${label} should be a valid email address`; 
          } else if (isPasswordConfirm && validity.customError) {
            error.textContent = 'Password and Confirm Password must be same';
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
                           onChange={this.handleChangeInput} 
                           required/> 
                           <i className={contentClass(this.state.isShow)}><FontAwesome.FaExclamationTriangle/></i>
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
                           onChange={this.handleChangeInput} 
                           required/>
                           <i className={contentClass(this.state.isShow)}><FontAwesome.FaExclamationTriangle/></i>
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
                           onChange={this.handleChangeInput} 
                           required/>
                           <i className={contentClass(this.state.isShow)}><FontAwesome.FaExclamationTriangle/></i>
                        </div>
                        <div className="inputfield">
                        <span><FontAwesome.FaLock /></span>
                        <input 
                           type="password" 
                           ref="confirmPassword" 
                           name="confirmPassword" 
                           className="requiredFiled"
                           placeholder="Confirm Password" 
                           value={this.state.confirmPassword}
                           onChange={this.handleChangeInput} 
                           required/>
                           <i className={contentClass(this.state.isShow)}><FontAwesome.FaExclamationTriangle/></i>
                        </div>          
                        <p>By registering you agree to our <strong>Terms</strong> and <strong>Privacy Policy</strong></p>
                        <div className="errorSection">
                         <div className="error" id="emailError" />
                         <div className="error" id="usernameError" />
                         <div className="error" id="passwordError" />
                         <div className="error" id="confirmPasswordError" />
                      </div> 
                      <input type="submit" value="Register" onClick={ this.formSubmit }/>
                      
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
