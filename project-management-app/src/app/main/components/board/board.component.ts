import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoardActions } from 'src/app/store/actions/board.action';
import { BoardHandlingService } from '../../services/board-handling.service';
import { IBoard } from '../../../shared/models/board.model';

enum InputLimitations {
  minLength = 3,
  titleMaxLength = 50,
  descriptionMaxLength = 120,
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Input() public board: IBoard | null = null;
  @Input() public mouseExisting = false;
  public readonly inputMinLength = InputLimitations.minLength;
  private readonly inputTitleMaxLength = InputLimitations.titleMaxLength;
  private readonly inputDescriptionMaxLength = InputLimitations.descriptionMaxLength;
  public editMode = false;
  public boardName = '';
  public boardDescription = '';
  public id = '';
  public cardForm: FormGroup;
  public boardEditMode = false;

  constructor(private readonly dialog: MatDialog, private readonly store: Store,
  public readonly boardHandlingService: BoardHandlingService) {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userTitle: new FormControl(this.board?.title, [
        Validators.required,
        Validators.minLength(this.inputMinLength),
        Validators.maxLength(this.inputTitleMaxLength),
      ]),
      userDescription: new FormControl(this.board?.description, [
        Validators.required,
        Validators.minLength(this.inputMinLength),
        Validators.maxLength(this.inputDescriptionMaxLength),
      ]),
    });
    if (this.board?.id) this.id = this.board.id;
    if (this.board?.title) this.boardName = this.board.title;
    if (this.board?.description) this.boardDescription = this.board.description;
  }

  public boardNameChange(event: MouseEvent, boardTitleInputValue: string, boardDescriptionInputValue: string): void {
    event.stopImmediatePropagation();
    this.editMode = false;
    if (!this.cardForm.controls['userTitle'].invalid && boardTitleInputValue &&
    !this.cardForm.controls['userDescription'].invalid && boardDescriptionInputValue &&
    boardTitleInputValue.trim().length >= this.inputMinLength &&
    boardDescriptionInputValue.trim().length >= this.inputMinLength) {
      this.boardName = boardTitleInputValue;
      this.boardDescription = boardDescriptionInputValue;
      this.boardEditMode = false;
      this.boardHandlingService.boardEditMode = false;
      this.store.dispatch(BoardActions.putBoard({ id: this.id, board: { title: boardTitleInputValue,
      description: boardDescriptionInputValue } }));
    }
  }

  public editButtonOnClick(): void {
    this.boardEditMode = true;
    this.boardHandlingService.boardEditMode = true;
  }

  public get userTitle(): AbstractControl | null {
    return this.cardForm.get('userTitle');
  }

  public get userDescription(): AbstractControl | null {
    return this.cardForm.get('userDescription');
  }

  public mouseMove(): void {
    this.board?.title.trim();
  }
}
