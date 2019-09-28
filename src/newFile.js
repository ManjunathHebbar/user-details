import { connect } from 'react-redux';
import App, { mapStateToProps, mapDispatchToProps } from './App';
connect(mapStateToProps, mapDispatchToProps)(App);
