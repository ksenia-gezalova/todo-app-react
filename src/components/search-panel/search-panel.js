import React, { Component} from 'react';
import './search-panel.css';


export default class SearchPanel extends Component {
  render() {
    const { searchItem, searchText } = this.props;
    const style = {
      fontSize: '20px'
    };

    return (
      <input value={searchText} onChange={searchItem} type="text" className="form-control search-input" style={style} placeholder='type to search' />
    )
  }
}