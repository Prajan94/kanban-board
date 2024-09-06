import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorHandling } from './common-method';
import { ErrorCode, TaskDetails } from './constants/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title : string = 'kanban-board';
  showTaskForm : boolean = false;
  showToaster : boolean = false;
  toDoList : Array<TaskDetails> = [{'title' : 'Analysis for reward form page'}, {'title' : 'Create Ux design for login page'}];
  implementingList: Array<TaskDetails> = [{'title' : 'Technical task to deploy in qaf'}, {'title' : 'Analysis for UX design'}];
  doneList : Array<TaskDetails> = [{'title' : 'Code clean up for existing adding rewards page'}, {'title' : 'Create form for adding new task'}];
  toasterMessage : string = "Task has been added succesfully !";
  errorType : string = "success";

  public taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: this.fb.control('', Validators.required),
    });
  }

  // Function to change the task status
  changeStatus(index : number, stage: string, direction?: string) {
    this.closeToaster();
    switch (stage) {
      case "toDo":
        if (this.implementingList && this.toDoList){ // Added null check since we are performing splice on Array of object
          this.implementingList.push(this.toDoList[index]);
          this.toDoList.splice(index, 1);
        }
        break;
      case "implementing":
        if(this.doneList && this.implementingList) { // Added null check since we are performing splice on Array of object
          direction == 'right' ? this.doneList.push(this.implementingList[index]) : this.toDoList.push(this.implementingList[index]);
          this.implementingList.splice(index, 1);
        }
        break;
      case "done":
        if(this.implementingList && this.doneList) { // Added null check since we are performing splice on Array of object
          this.implementingList.push(this.doneList[index]);
          this.doneList.splice(index, 1);
        }
        break;
        default:
          this.toasterMessage = errorHandling(ErrorCode.noMatch);
          this.errorType = 'alert';
          this.showToaster = true;
          break;
    }
  }

  // Function to remove the tasks
  removeTask(index : number, stage: string) {
    this.closeToaster();
    switch (stage) {
      case "toDo":
        if(this.toDoList) {
          this.toDoList.splice(index, 1);
          this.toasterMessage = "Task has been removed from To Do status succesfully !";
          this.errorType = 'success';
        }
        break;
      case "implementing":
        if(this.implementingList) {
          this.implementingList.splice(index, 1);
          this.toasterMessage = "Task has been removed from Implementing status succesfully !";
          this.errorType = 'success';
        }
        break;
      case "done":
        if(this.doneList) {
          this.doneList.splice(index, 1);
          this.toasterMessage = "Task has been removed from Done status succesfully !";
          this.errorType = 'success';
        }
        break;
      default:
        this.toasterMessage = errorHandling(ErrorCode.noMatch);
        this.errorType = 'alert';
        break;
  }
  this.showToaster = true;
}

// Adding new task
actionTask() {
  if(this.taskForm.valid) {
    this.toDoList.push(
      {
        title : this.taskForm.controls['taskName'].value
      }
    );
    this.taskForm.reset();
    this.toasterMessage = "Task has been added succesfully !";
    this.errorType = 'success';
    this.showTaskForm = false;
    this.showToaster = true;
  } else {
    this.toasterMessage = errorHandling(ErrorCode.userError);
    this.errorType = 'alert';
  }
  }

// Creating New Task
createTask() {
  this.closeToaster();
  this.showTaskForm = true;
}

//Closing the task dialog
closeTask() {
  this.taskForm.reset();
  this.showTaskForm = false;
}

// Closing the toaster
closeToaster() {
  this.showToaster = false;
}

// Elimated the multiple rendering of DOM's for perfomance optimization
optimize(index: number, list: TaskDetails) {
  return list.title;
}

}
