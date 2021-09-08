import React, { Component } from 'react';
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css'

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make app'),
      this.createTodoItem('Have a lunch')
    ],
    searchText: '',
    filter: 'all' // active, all, done
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      id: Date.now() + Math.random(0, 1),
      done: false
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => el.id !== id)

      return {
        todoData: newArray
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [
        ...todoData,
        newItem
      ]

      return {
        todoData: newArray
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem.propName };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx+1)
    ]    
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  }

  searchItem = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }

  onFilterChange = (filter) => {
    this.setState({filter});
  }

  search(items, searchText) {
    if (searchText.length === 0) return items;

    return items.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(searchText.toLowerCase()) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done)
      case 'done':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  render() {
    const { todoData, searchText, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, searchText), filter)

    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount

    return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel searchItem={this.searchItem} searchText={searchText} />
        <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
      </div>
        <TodoList todos={visibleItems} onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={ this.onToggleDone}/>
        <ItemAddForm onItemAdded={this.addItem} />
  </div>
  )
  }
}
