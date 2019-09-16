import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";

@Component({
  selector: "app-new-project",
  templateUrl: "./new-project.component.html",
  styleUrls: ["../projects.component.css"]
})
export class NewProjectComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private dashBoardService: DashboardService
  ) {}

  // Add Project
  add_project_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  projectTypes: ProjectType[] = [
    { value: "steak-0", viewValue: "Project 1" },
    { value: "pizza-1", viewValue: "Project 2" },
    { value: "tacos-2", viewValue: "Project 3" }
  ];

  // Add Machine
  addMachineColumns = [
    "select",
    "plant",
    "platform",
    "model",
    "vin",
    "hours",
    "buttons"
  ];
  machineDataSource = new MatTableDataSource<Machine>(MACHINE_DATA);
  machineSelection = new SelectionModel<Machine>(true, []);

  isAllMachineSelected() {
    const numSelected = this.machineSelection.selected.length;
    const numRows = this.machineDataSource.data.length;
    return numSelected === numRows;
  }

  masterMachineToggle() {
    this.isAllMachineSelected()
      ? this.machineSelection.clear()
      : this.machineDataSource.data.forEach(row =>
          this.machineSelection.select(row)
        );
  }

  // Add Users
  addUserColumns = ["select", "plant", "role", "user", "phone", "buttons"];
  userDataSource = new MatTableDataSource<User>(USER_DATA);
  userSelection = new SelectionModel<User>(true, []);

  isAllUserSelected() {
    const numSelected = this.userSelection.selected.length;
    const numRows = this.userDataSource.data.length;
    return numSelected === numRows;
  }

  masterUserToggle() {
    this.isAllUserSelected()
      ? this.userSelection.clear()
      : this.userDataSource.data.forEach(row => this.userSelection.select(row));
  }

  // Endurance Cycle
  enduranceCycleColumns = [
    "select",
    "activity",
    "instructions",
    "hours",
    "buttons"
  ];
  enduranceCycleDataSource = new MatTableDataSource<EnduranceCycle>(
    ENDURANCE_CYCLE
  );
  enduranceCycleSelection = new SelectionModel<EnduranceCycle>(true, []);

  isEnduranceCycleSelected() {
    const numSelected = this.enduranceCycleSelection.selected.length;
    const numRows = this.enduranceCycleDataSource.data.length;
    return numSelected === numRows;
  }

  enduranceCycleMasterToggle() {
    this.isEnduranceCycleSelected()
      ? this.enduranceCycleSelection.clear()
      : this.enduranceCycleDataSource.data.forEach(row =>
          this.enduranceCycleSelection.select(row)
        );
  }

  // Review
  reviewMachinesColumn = ["plant", "platform", "model", "vin", "hours"];
  reviewUsersColumn = ["plant", "role", "user", "phone"];
  reviewEnduranceCycleColumn = ["activity", "instructions", "hours"];

  // Creating Form
  formGroup: FormGroup;
  addProjectFormGroup: FormGroup;
  addMachineFormGroup: FormGroup;
  addUsersFormGroup: FormGroup;
  eduranceFormFormGroup: FormGroup;

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }

  ngOnInit() {
    this.dashBoardService.setTitle("Add New Project");
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          projectTypeFormCtrl: ["", Validators.required],
          startDateFormCtrl: ["", Validators.required],
          endDateFormCtrl: ["", Validators.required],
          projectNameFormCtrl: ["", Validators.required],
          projectDesciptionFormCtrl: ["", Validators.required]
        }),
        this._formBuilder.group({
          emailFormCtrl: ["", Validators.email]
        })
      ])
    });

    this.addProjectFormGroup = this._formBuilder.group({
      firstNameCtrl: ["", Validators.required],
      lastNameCtrl: ["", Validators.required]
    });

    this.addMachineFormGroup = this._formBuilder.group({
      emailCtrl: ["", Validators.email]
    });
  }

  onSubmit(data) {
    console.log(data);
  }

  onDelete(group) {
    console.log(group);
  }

  onAddUser(user) {
    console.log(user);
  }
}

export interface ProjectType {
  value: string;
  viewValue: string;
}

export interface Machine {
  plant: string;
  platform: string;
  model: string;
  vin: string;
  hours: string;
}

export interface User {
  plant: string;
  role: string;
  user: string;
  phone: string;
}

export interface EnduranceCycle {
  activity: string;
  instructions: string;
  hours: string;
}

const MACHINE_DATA: Machine[] = [
  {
    plant: "Pune",
    platform: "Excavators",
    model: "JCB124495",
    vin: "ABC74549330",
    hours: "1000"
  },
  {
    plant: "Pune",
    platform: "Excavators",
    model: "JCB124495",
    vin: "ABC74549330",
    hours: "1000"
  }
];

const USER_DATA: User[] = [
  {
    plant: "Pune",
    role: "Operators",
    user: "Ankit K",
    phone: "1234567890"
  },
  {
    plant: "Pune",
    role: "Operators",
    user: "Ankit K",
    phone: "1234567890"
  }
];

const ENDURANCE_CYCLE: EnduranceCycle[] = [
  {
    activity: "Digging",
    instructions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    hours: "3000"
  },
  {
    activity: "Pune",
    instructions:
      "Lorem Ipsum is simply dummy text of the printing and typesetting ",
    hours: "4000"
  }
];
