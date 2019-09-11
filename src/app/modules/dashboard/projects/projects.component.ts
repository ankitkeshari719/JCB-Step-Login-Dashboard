import { Component, ViewChild, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { SelectionModel } from "@angular/cdk/collections";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  displayedColumns = [
    "select",
    "position",
    "name",
    "weight",
    "symbol",
    "company"
  ];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  company: string;
}

const ELEMENT_DATA: Element[] = [
  {
    position: 1,
    name: "Hydrogen",
    weight: 1.0079,
    symbol: "H",
    company: "GS Lab"
  },
  {
    position: 2,
    name: "Helium",
    weight: 4.0026,
    symbol: "He",
    company: "GS Lab"
  },
  {
    position: 3,
    name: "Lithium",
    weight: 6.941,
    symbol: "Li",
    company: "GS Lab"
  },
  {
    position: 4,
    name: "Beryllium",
    weight: 9.0122,
    symbol: "Be",
    company: "GS Lab"
  },
  {
    position: 5,
    name: "Boron",
    weight: 10.811,
    symbol: "B",
    company: "GS Lab"
  },
  {
    position: 6,
    name: "Carbon",
    weight: 12.0107,
    symbol: "C",
    company: "GS Lab"
  },
  {
    position: 7,
    name: "Nitrogen",
    weight: 14.0067,
    symbol: "N",
    company: "GS Lab"
  },
  {
    position: 8,
    name: "Oxygen",
    weight: 15.9994,
    symbol: "O",
    company: "GS Lab"
  },
  {
    position: 9,
    name: "Fluorine",
    weight: 18.9984,
    symbol: "F",
    company: "GS Lab"
  },
  {
    position: 10,
    name: "Neon",
    weight: 20.1797,
    symbol: "Ne",
    company: "GS Lab"
  },
  {
    position: 11,
    name: "Sodium",
    weight: 22.9897,
    symbol: "Na",
    company: "GS Lab"
  },
  {
    position: 12,
    name: "Magnesium",
    weight: 24.305,
    symbol: "Mg",
    company: "GS Lab"
  },
  {
    position: 13,
    name: "Aluminum",
    weight: 26.9815,
    symbol: "Al",
    company: "GS Lab"
  },
  {
    position: 14,
    name: "Silicon",
    weight: 28.0855,
    symbol: "Si",
    company: "GS Lab"
  },
  {
    position: 15,
    name: "Phosphorus",
    weight: 30.9738,
    symbol: "P",
    company: "GS Lab"
  },
  {
    position: 16,
    name: "Sulfur",
    weight: 32.065,
    symbol: "S",
    company: "GS Lab"
  },
  {
    position: 17,
    name: "Chlorine",
    weight: 35.453,
    symbol: "Cl",
    company: "GS Lab"
  },
  {
    position: 18,
    name: "Argon",
    weight: 39.948,
    symbol: "Ar",
    company: "GS Lab"
  },
  {
    position: 19,
    name: "Potassium",
    weight: 39.0983,
    symbol: "K",
    company: "GS Lab"
  },
  {
    position: 20,
    name: "Calcium",
    weight: 40.078,
    symbol: "Ca",
    company: "GS Lab"
  }
];
