import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  name: string;
  isCompleted: boolean;
  isImportant: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isSidebarVisible = false;
  isImportantView = false;
  isContactMenuOpen = false;
  title: string = 'Pola To-Do';
  searchQuery = '';
  newTask = '';
  contactName = '';
  contactEmail = '';
  contactMessage = '';
  tasks: Task[] = [];

  constructor() {
    this.loadTasks(); 
  }

  get displayedTasks() {
    if (this.isImportantView) {
      return this.tasks.filter(task => task.isImportant);
    }
    return this.tasks.filter(task => task.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  showAllTasks() {
    this.isImportantView = false;
    this.isContactMenuOpen = false; 
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleImportantView() {
    this.isImportantView = !this.isImportantView;
  }

  toggleTaskCompletion(index: number) {
    this.tasks[index].isCompleted = !this.tasks[index].isCompleted;
    this.saveTasks(); 
  }

  toggleImportant(index: number) {
    this.tasks[index].isImportant = !this.tasks[index].isImportant;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks(); 
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ name: this.newTask, isCompleted: false, isImportant: false });
      this.newTask = '';
      this.saveTasks(); 
    }
  }

  toggleContactMenu() {
    this.isContactMenuOpen = !this.isContactMenuOpen;
  }

  sendMessage() {
    alert(`Message sent from ${this.contactName} (${this.contactEmail}): ${this.contactMessage}`);
    this.contactName = '';
    this.contactEmail = '';
    this.contactMessage = '';
  }

  
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  
  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
}
