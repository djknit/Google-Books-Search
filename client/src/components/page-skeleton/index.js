import React, { Component } from 'react';
import Navbar from './components/navbar';
import Hero from './components/hero';
import MyFooter from './components/footer';

class pageSkeleton extends Component {
  constructor(props) {
    super(props);
    this.hero = React.createRef();
    this.navbar = React.createRef();
  }

  componentDidMount

  render() {
    return(<>
      <Navbar
        
      />
      <Hero
        heroRef={this.hero}
        pageName={this.props.pageName}
        isMedium={this.props.is404}
        is404={this.props.is404}
      />
      <div class='main-content'>
        { this.props.children }
      </div>
      <MyFooter />
    </>);
  }
}

export default pageSkeleton;