import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import {
  AbstractControlOptions,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { validEndDate } from '@app/shared/utils/date-validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryService } from '@app/modules/admin/services/lottery.service';
import { ILottery } from '@app/core/models/loterry';

// prime ng
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToggleButtonModule } from 'primeng/togglebutton';

type controlType = 'name' | 'description' | 'prize' | 'startDate' | 'endDate';

export interface IFormLottery {
  name: FormControl<string>;
  description: FormControl<string>;
  prize: FormControl<string>;
  startDate: FormControl<Date>;
  endDate: FormControl<Date>;
  active: FormControl<boolean>;
}

@Component({
  selector: 'app-add-or-edit-lottery',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DividerModule,
    CalendarModule,
    InputTextareaModule,
    ToggleButtonModule,
  ],
  providers: [LotteryService],
  templateUrl: './add-or-edit-lottery.component.html',
  styleUrl: './add-or-edit-lottery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddOrEditLotteryComponent implements OnInit {
  // Services
  private lotteryAdminService = inject(LotteryService);
  private nnfb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Variables
  public lotteryId: string | null = null;
  public currentDate: Date = new Date();
  public lotteryForm = this.nnfb.group<IFormLottery>(
    {
      name: this.nnfb.control('', [Validators.required]),
      description: this.nnfb.control('', [Validators.required]),
      prize: this.nnfb.control('', [Validators.required]),
      startDate: this.nnfb.control(new Date(), [Validators.required]),
      endDate: this.nnfb.control(new Date(), [Validators.required]),
      active: this.nnfb.control(true, [Validators.required]),
    },
    { validators: validEndDate } as AbstractControlOptions
  );

  constructor() {
    this.lotteryId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.lotteryId) {
      const id = Number(this.lotteryId);
      this.lotteryAdminService
        .getLotteryBtId(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (lottery) => this.fillFormData(lottery),
          error: () => this.router.navigateByUrl('/admin'),
        });
    }
  }

  fillFormData(lottery: ILottery) {
    this.lotteryForm.patchValue({
      name: lottery.name,
      description: lottery.description,
      prize: lottery.prize,
      active: lottery.active,
      startDate: new Date(lottery.startDate),
      endDate: new Date(lottery.endDate),
    });
  }

  inputValid(control: controlType): boolean {
    return (
      !!this.lotteryForm.get(control)?.invalid &&
      !!this.lotteryForm.get(control)?.touched
    );
  }

  save() {
    if (this.lotteryForm.invalid) return this.lotteryForm.markAllAsTouched();

    const startDate = this.lotteryForm.controls['startDate'].value;
    const endDate = this.lotteryForm.controls['endDate'].value;
    const active = this.lotteryForm.controls['active'].value;

    let lottery: ILottery = {
      name: this.lotteryForm.controls['name'].value,
      description: this.lotteryForm.controls['description'].value,
      prize: this.lotteryForm.controls['prize'].value,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    if (this.lotteryId) {
      lottery = { ...lottery, id: Number(this.lotteryId), active };
    }

    this.lotteryId ? this.updateLottery(lottery) : this.addLottery(lottery);
  }

  addLottery(lottery: ILottery) {
    this.lotteryAdminService
      .createLottery(lottery)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  updateLottery(lottery: ILottery) {
    this.lotteryAdminService
      .updateLottery(lottery)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
