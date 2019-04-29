import React, { Component } from 'react';
import './style.css';
import Hero from '../../components/hero';
import api from '../../utilities/api';

class VerifyEmailPage extends Component {
  constructor(props) {
    super(props);
    this.startCountdown = this.startCountdown.bind(this);
    this.state = {
      isLoading: true,
      hasSuccess: false,
      hasError: false,
      errorMessage: null,
      countdown: null,
      newEmail: null
    }
  }

  startCountdown() {
    this.setState({ countdown: 7 });
    const intervalId = setInterval(() => {
      let count = this.state.countdown;
      count--;
      this.setState({ countdown: count });
      if (count === 0) {
        clearInterval(intervalId);
        this.props.history.push(this.state.hasSuccess ? '/search' : '/');
      }
    }, 1000);
  }

  componentDidMount() {
    const token = this.props.match && this.props.match.params && this.props.match.params.token;
    if (!token) return this.setState({
      isLoading: false,
      hasError: true,
      errorMessage: 'Missing verification token.'
    });
    api.auth.verifyEmail(token)
      .then(res => {
        console.log(res);
        if (res.data && res.data.success) {
          this.props.setUser(res.data.user);
          this.setState({
            isLoading: false,
            hasSuccess: true,
            newEmail: res.data.user.email
          });
          return this.startCountdown();
        }
        else this.setState({
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err.response);
        const errorMessage = (
          err && err.response && err.response.data && err.response.data && err.response.data.message
        ) ||'Unknown error.';
        this.setState({
          isLoading: false,
          hasError: true,
          errorMessage
        });
      });
  }
  
  render() {
    const { footerHeight } = this.props; 

    const style={
      componentRootEl: {
        minHeight: `calc(100vh - ${footerHeight + 53}px)`
      }
    }

    return(
      <div id="email-verify" style={style.componentRootEl}>
        <Hero pageName="Email Verification Page" />
        <div className="email-verify-content has-text-centered">
            {
              (this.state.isLoading &&
                <>
                  <h1 className="title is-size-1 email-verify">Loading...</h1>
                  <h2 className="title is-size-3">(Checking your verification token.)</h2>
                </>
              ) ||
              (this.state.hasSuccess &&
                <>
                  <h1 className="title is-size-1 email-verify">Success!</h1>
                  <h2 className="title is-size-3">Your address has been verified.</h2>
                </>
              ) ||
              (this.state.hasError &&
                <>
                  <h1 className="title is-size-1 email-verify">Error...</h1>
                  <h2 className="title is-size-3">{this.state.errorMessage}</h2>
                </>  
              ) ||
              <>
                <h1 className="title is-size-1 email-verify">Sorry...</h1>
                <h2 className="title is-size-3">Your token is invalid or expired.</h2>
              </>
            }
          <hr />
          {
            (this.state.hasSuccess &&
              <p className="is-size-4">Your email address is now {this.state.newEmail}.</p>
            ) ||
            (this.state.hasError &&
              <p className="is-size-4">You may want to try reloading the page.</p>
            )
          }
          {(this.state.hasError || (!this.state.isLoading && !this.state.hasSuccess)) &&
            <p className="is-size-4 long">
              You may {this.state.hasError && <>also</>} want to double check your link or request another
              email verification link by entering your new email again in your account settings.
            </p>
          }
          <div style={{ height: 50 }}></div>
          {
            (this.state.hasSuccess &&
              <p className="redirect-message">
                You will be redirected in { this.state.countdown } seconds.
              </p>
            ) ||
            (!this.state.isLoading &&
              <button className="button is-deep is-size-5" onClick={() => this.props.history.push('/')}>
                <i class="fas fa-home" />&nbsp;Home
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

export default VerifyEmailPage;