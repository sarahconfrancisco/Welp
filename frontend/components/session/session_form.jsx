import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component{
  constructor(props){
    super(props);

    if(this.props.formType === "Log In"){
      this.state = {email: "", password: ""};
    } else {
      this.state = {email: "", password: "", day: "", month: "", year: "", zip: "", fname: "", lname: ""};
      }
    }

  componentWillReceiveProps(nextProps){
    if(nextProps.loggedIn){
      this.props.router.push("/");
    }
  }

  componentDidMount(){
    if(this.props.loggedIn){
      this.props.router.push("/");
    }
  }

  update(field){
    return ((e) => this.setState({[field]: e.target.value}));
  }

  handleSubmit(e){
    e.preventDefault();
    let user = this.state;
    if(user.day){
      user.birthday = this.state.month + "/" + this.state.day + "/" + this.state.year;
    }
    this.props.processForm({user});

  }

  generateMonths(){
    return (
      <select value={this.state.month} onChange={this.update('month').bind(this)}>
        <option key="month" value="">Month</option>
        <option key="1" value="01">Jan</option>
        <option key="2" value="02">Feb</option>
        <option key="3" value="03">Mar</option>
        <option key="4" value="04">Apr</option>
        <option key="5" value="05">May</option>
        <option key="6" value="06">Jun</option>
        <option key="7" value="07">Jul</option>
        <option key="8" value="08">Aug</option>
        <option key="9" value="09">Sep</option>
        <option key="10" value="10">Oct</option>
        <option key="11" value="11">Nov</option>
        <option key="12" value="12">Dec</option>
      </select>)
  }

  generateDays(){
    let days = [];
    for (let i = 1; i <= 31; i++){
      days.push(<option key={i} value={i.toString()}>{i}</option>);
    }
    return(
      <select value={this.state.day} onChange={this.update('day').bind(this)}>
        <option key="day" value="">Day</option>
        {days}
      </select>
    );
  }

  generateYears(){
    let years = [];
    for (let i = 2017; i >= 1900; i--){
      years.push(<option key={i} value={i.toString()}>{i}</option>);
    }
    return(
      <select value={this.state.year} onChange={this.update('year').bind(this)}>
        <option key="year" value="">Year</option>
        {years}
      </select>
    );
  }

  render(){
    const months = this.generateMonths();
    const days = this.generateDays();
    const years = this.generateYears();
    let name;
    let zip_birthday;
    let title;
    let terms;
    let bottomLink;
    let forgotPassword;
    if (this.props.formType === "Sign Up"){
      bottomLink = (
        <span className="bottom-link">
          Already on Welp? <Link to="/login">Log In</Link>
        </span>
      )
      name = (
        <div className="half-input">
          <input type="text"
                 placeholder="First Name"
                 value={this.state.fname}
                 onChange={this.update('fname').bind(this)}
          />
          <input type="text"
                 value={this.state.lname}
                 placeholder="Last Name"
                 onChange={this.update('lname').bind(this)}
          />
        </div>
      )
      title = (
        <div className="title">
          <h4>Sign Up for Welp</h4>
          <h6>Connect with great local restaurants</h6>
        </div>
      )
      zip_birthday = (
        <div className ="zip_birthday">
          <input className="full-input" type="text" value={this.state.zip} placeholder="ZIP Code" onChange={this.update('zip').bind(this)}/>
          <br />
          <label>Birthday <span className="terms">Optional</span></label>
          <ul className="birthday">
            <li>
              {months}
            </li>
            <li>
              {days}
            </li>
            <li>
              {years}
            </li>
          </ul>
          <br />
        </div>
      )

      terms = (
        <span className="terms">
          By signing up, you agree to Welp's
          <a> Terms of Service </a>and
          <a> Privacy Policy</a>.
        </span>

      )
    } else {
      forgotPassword = (
        <span className="terms bottom-link">
          <a>Forgot Password?</a>
        </span>
      )
      terms = (
        <span className="terms">
          By logging in, you agree to Welp's
          <a> Terms of Service </a>
           and <a> Privacy Policy</a>.
        </span>

      )
      bottomLink = (
        <span className="bottom-link">
          New to Welp? <Link to="/signup">Sign Up</Link>
        </span>
      )
      title = (
        <div className="title">
          <h4>Log In to Welp</h4>
          <h6>New to Welp? <Link to="/signup">Sign up</Link></h6>
        </div>
      )
    }
    return(
      <div className="session-page">
        <form className="session-form">
          {title}
          <br />
          <div className="name-password">
            {name}
            <input className="full-input"
                   type="text" placeholder="Email"
                   value={this.state.email}
                   onChange={this.update('email').bind(this)}
            />
            <br />
            <input className="full-input"
                   type="password"
                   placeholder="Password (minimum 6 characters)"
                   onChange={this.update('password').bind(this)}
                   value={this.state.password}
            />
            {forgotPassword}
          </div>
          <br />
          {zip_birthday}
          {terms}
          <button onClick={this.handleSubmit.bind(this)} className="full-input">
            <span>{this.props.formType}</span>
          </button>
          {bottomLink}
        </form>
        <div className="picture-container">
          <img src={window.images.coffee_cup} />
        </div>
    </div>
    );
  }
}

export default SessionForm;
