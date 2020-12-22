"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.List = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var List = /** @class */ (function () {
    function List(dialog, todoService, http) {
        this.dialog = dialog;
        this.todoService = todoService;
        //init the data
        this.displayedColumns = ["Person", "Description", "Priority", "Length", "Actions"];
        // MatPaginator Inputs
        this.length = this.todoService.getAllTodo().length;
        this.dataSource = this.todoService.getAllTodo();
        this.sname = true;
        this.sdesc = true;
        this.sprio = true;
        this.todo = [];
        this.http = http;
    }
    List.prototype.ngOnInit = function () {
        var _this = this;
        this.todoService.findAll().subscribe(function (data) {
            _this.dataSource = data;
            console.dir(_this.dataSource);
        });
        console.dir(this.todo);
    };
    List.prototype.filter = function (searchString) {
        var _this = this;
        this.todoService.findAll().subscribe(function (data) {
            _this.dataSource = data.filter(function (todo) { return todo.person.indexOf(searchString) != -1 ||
                todo.description.indexOf(searchString) != -1 ||
                todo.priority == 1 && ('Major'.indexOf(searchString)) != -1 ||
                todo.priority == 2 && ('Medium'.indexOf(searchString)) != -1 ||
                todo.priority == 3 && ('Minor'.indexOf(searchString)) != -1 ||
                todo.priority != 1 && todo.priority != 2 && todo.priority != 3 && ('None'.indexOf(searchString)) != -1 ||
                (todo.length.toString() + " Stunden").indexOf(searchString) != -1; });
        });
    };
    ;
    List.prototype.firstPage = function () {
        this.paginator.firstPage();
    };
    List.prototype.refresh = function () {
        this.dataSource = this.dataSource;
    };
    List.prototype.reload = function () {
        this.dataSource = this.todoService.getAllTodo();
        this.length = this.dataSource.length;
        this.firstPage();
        this.refresh();
    };
    List.prototype.onRowClicked = function (row) {
        console.log('Row clicked: ', row);
    };
    List.prototype.getColor = function (id) {
        if (id == 1)
            return 'red';
        if (id == 2)
            return '#FF8800';
        if (id == 3)
            return 'green';
        return 'grey';
    };
    List.prototype.getPrior = function (id) {
        if (id == 1)
            return 'Major';
        if (id == 2)
            return 'Medium';
        if (id == 3)
            return 'Minor';
        return 'None';
    };
    List.prototype.remove = function (id) {
    };
    List.prototype.sortName = function () {
        if (this.sname) {
            this.dataSource.sort(function (a, b) { return a.person.localeCompare(b.person); });
            this.sname = !this.sname;
        }
        else {
            this.dataSource.sort(function (b, a) { return a.person.localeCompare(b.person); });
            this.sname = !this.sname;
        }
    };
    List.prototype.sortDescripton = function () {
        if (this.sdesc) {
            this.dataSource.sort(function (a, b) { return a.description.localeCompare(b.description); });
            this.sdesc = !this.sdesc;
        }
        else {
            this.dataSource.sort(function (b, a) { return a.description.localeCompare(b.description); });
            this.sdesc = !this.sdesc;
        }
    };
    List.prototype.sortPriority = function () {
        if (this.sprio) {
            this.dataSource = this.dataSource.sort(function (a, b) { return a.priority < b.priority ? 0 : 1; });
            this.sprio = !this.sprio;
        }
        else {
            this.dataSource = this.dataSource.sort(function (b, a) { return a.priority < b.priority ? 0 : 1; });
            this.sprio = !this.sprio;
        }
    };
    List.prototype.sortLength = function () {
        this.dataSource = this.dataSource.sort(function (a, b) { return a.length < b.length ? 1 : 0; });
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], List.prototype, "paginator");
    List = __decorate([
        core_1.Component({
            selector: 'list-component',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        })
    ], List);
    return List;
}());
exports.List = List;
