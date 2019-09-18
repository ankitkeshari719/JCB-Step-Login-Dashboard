import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { SelectionModel } from "@angular/cdk/collections";
import { ProjectType, Machine, User, EnduranceCycle } from "src/app/services";
import { BehaviorSubject } from "rxjs";

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

  // Creating Form
  formGroup: FormGroup;

  ngOnInit() {
    this.dashBoardService.setTitle("Add New Project");
    this.formGroup = this._formBuilder.group({
      stepperData: this._formBuilder.array([
        this._formBuilder.group({
          type: null,
          startDate: null,
          endDate: null,
          projectName: null,
          description: null
        }),
        this._formBuilder.group({
          machines: this._formBuilder.array([])
        }),
        this._formBuilder.group({
          users: this._formBuilder.array([])
        }),
        this._formBuilder.group({
          enduranceCycles: this._formBuilder.array([])
        })
      ])
    });
    this.machineData.forEach((d: Machine) => this.addMachines(d, false));
    this.userData.forEach((d: User) => this.addUser(d, false));
    this.enduranceData.forEach((d: EnduranceCycle) =>
      this.addEnduranceCycle(d, false)
    );
    this.updateMachineTable();
    this.updateUserTable();
    this.updateEnduranceCycle();
  }

  /** Returns a stepperData with the name 'stepperData'. */
  get stepperData(): AbstractControl | null {
    return this.formGroup.get("stepperData");
  }

  // Step 1: Add Project
  add_project_description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  projectTypes: ProjectType[] = [
    { value: "N/A", viewValue: "Select" },
    { value: "101", viewValue: "NPIP" },
    { value: "102", viewValue: "EI" }
  ];

  // Step 2: Add Machine
  machineDataSource = new BehaviorSubject<AbstractControl[]>([]);
  machineSelection = new SelectionModel<Machine>(true, []);
  machineColumns = [
    "select",
    "plant",
    "platform",
    "model",
    "vin",
    "hours",
    "buttons"
  ];

  // Manual data (need to changes)
  machineData: Machine[] = [
    {
      plant: "N/A",
      platform: "N/A",
      model: "JCB12345",
      vin: "123",
      hours: "1000"
    },
    {
      plant: "N/A",
      platform: "excavators",
      model: "",
      vin: "",
      hours: ""
    }
  ];

  // Manual data (need to changes)
  plants = [
    { id: "N/A", name: "Select" },
    { id: "pune", name: "Pune" },
    { id: "jaipur", name: "Jaipur" },
    { id: "anu", name: "Umbre" }
  ];

  // Manual data (need to changes)
  platforms = [
    { id: "N/A", name: "Select" },
    { id: "excavators", name: "Excavators" }
  ];

  // Manual data (need to changes)
  models = [{ id: "N/A", name: "Select" }, { id: "111", name: "JCB12345" }];

  get machines() {
    return this.formGroup
      .get("stepperData")
      .get([1])
      .get("machines") as FormArray;
  }

  addMachines(d?: Machine, noUpdate?: boolean) {
    this.machines.push(
      this._formBuilder.group({
        plant: [d && d.plant ? d.plant : "N/A", []],
        platform: [d && d.platform ? d.platform : "N/A", []],
        model: [d && d.model ? d.model : null, []],
        vin: [d && d.vin ? d.vin : null, []],
        hours: [d && d.hours ? d.hours : null, []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateMachineTable();
    }
  }

  updateMachineTable() {
    this.machineDataSource.next(this.machines.controls);
  }
  isAllMachineSelected() {
    const numSelected = this.machineSelection.selected.length;
    const numRows = this.machineDataSource.value.length;
    return numSelected === numRows;
  }

  masterMachineToggle() {
    this.isAllMachineSelected()
      ? this.machineSelection.clear()
      : this.machineDataSource.value.forEach(row => {
          return this.machineSelection.select(row.value);
        });
  }

  // Step 3:  Add Users
  userDataSource = new BehaviorSubject<AbstractControl[]>([]);
  userSelection = new SelectionModel<User>(true, []);
  userColumns = ["select", "plant", "role", "user", "phone", "buttons"];

  // Manual data (need to changes)
  userData: User[] = [
    { plant: "N/A", role: "operator", user: "leho2121", phone: "9876543210" },
    { plant: "N/A", role: "operator", user: "leho2121", phone: "9876543210" }
  ];

  // Manual data (need to changes)
  roles = [
    { id: "N/A", name: "Select" },
    { id: "operator", name: "Operator" },
    { id: "test_engineer", name: "Test Engineer" }
  ];

  // Manual data (need to changes)
  usersTypes = [
    { id: "N/A", name: "Select" },
    { id: "leho2121", name: "Leroy Holland" }
  ];

  get users() {
    return this.formGroup
      .get("stepperData")
      .get([2])
      .get("users") as FormArray;
  }

  addUser(d?: User, noUpdate?: boolean) {
    this.users.push(
      this._formBuilder.group({
        plant: [d && d.plant ? d.plant : "N/A", []],
        role: [d && d.role ? d.role : "N/A", []],
        user: [d && d.user ? d.user : null, []],
        phone: [d && d.phone ? d.phone : null, []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateUserTable();
    }
  }

  updateUserTable() {
    this.userDataSource.next(this.users.controls);
  }

  isAllUserSelected() {
    const numSelected = this.userSelection.selected.length;
    const numRows = this.userDataSource.value.length;
    return numSelected === numRows;
  }

  masterUserToggle() {
    this.isAllUserSelected()
      ? this.userSelection.clear()
      : this.userDataSource.value.forEach(row =>
          this.userSelection.select(row.value)
        );
  }

  // Step 4:  Endurance Cycle
  enduranceCycleDataSource = new BehaviorSubject<AbstractControl[]>([]);
  enduranceCycleSelection = new SelectionModel<EnduranceCycle>(true, []);
  enduranceCycleColumns = [
    "select",
    "activity",
    "instructions",
    "hours",
    "buttons"
  ];

  // Manual data (need to changes)
  enduranceData: EnduranceCycle[] = [
    {
      activity: "N/A",
      instructions: "N/A",
      hours: "123"
    }
  ];

  // Manual data (need to changes)
  activities = [{ id: "N/A", name: "Select" }, { id: "E101", name: "Loading" }];

  get enduranceCycles() {
    return this.formGroup
      .get("stepperData")
      .get([3])
      .get("enduranceCycles") as FormArray;
  }

  addEnduranceCycle(d?: EnduranceCycle, noUpdate?: boolean) {
    this.enduranceCycles.push(
      this._formBuilder.group({
        activity: [d && d.activity ? d.activity : "N/A", []],
        instructions: [d && d.instructions ? d.instructions : "N/A", []],
        hours: [d && d.hours ? d.hours : null, []],
        button: null
      })
    );
    if (!noUpdate) {
      this.updateEnduranceCycle();
    }
  }

  updateEnduranceCycle() {
    this.enduranceCycleDataSource.next(this.enduranceCycles.controls);
  }

  isEnduranceCycleSelected() {
    const numSelected = this.enduranceCycleSelection.selected.length;
    const numRows = this.enduranceCycleDataSource.value.length;
    return numSelected === numRows;
  }

  enduranceCycleMasterToggle() {
    this.isEnduranceCycleSelected()
      ? this.enduranceCycleSelection.clear()
      : this.enduranceCycleDataSource.value.forEach(row =>
          this.enduranceCycleSelection.select(row.value)
        );
  }

  // Step 5: Review
  // Manual data (need to changes)
  reviewMachinesColumn = ["plant", "platform", "model", "vin", "hours"];
  reviewUsersColumn = ["plant", "role", "user", "phone"];
  reviewEnduranceCycleColumn = ["activity", "instructions", "hours"];

  // In Progress
  onSubmit(data) {
    console.log(data);
  }
}
