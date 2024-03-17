import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LotteryApiService } from '@app/core/api/lottery-api.service';
import { ILottery } from '@app/core/models/loterry';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EMPTY, Observable, map, switchMap, tap } from 'rxjs';

@Injectable()
export class LotteryService {
  // services
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private lotteryApi = inject(LotteryApiService);
  private router = inject(Router);

  // lotterys state
  public lotterys = signal<ILottery[]>([]);

  getAllLotterys(): Observable<void> {
    return this.lotteryApi.getAllLotterys().pipe(
      tap((response) => this.lotterys.set(response.data)),
      switchMap(() => EMPTY)
    );
  }

  getLotteryBtId(id: number): Observable<ILottery> {
    return this.lotteryApi
      .getLotteryById(id)
      .pipe(map((response) => response.data));
  }

  createLottery(lottery: ILottery): Observable<void> {
    return this.lotteryApi.createLottery(lottery).pipe(
      tap((response) => this.showMessage(response.message)),
      tap((_) => this.router.navigate(['/admin/dashboard/sorteos'])),
      switchMap(() => EMPTY)
    );
  }

  updateLottery(lottery: ILottery): Observable<void> {
    return this.lotteryApi.updateLottery(lottery).pipe(
      tap((response) => this.showMessage(response.message)),
      switchMap(() => EMPTY)
    );
  }

  confirmDeleteLottery(id: number) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de que quieres eliminar este sorteo?',
      header: 'Eliminar Sorteo',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      key: 'dialog',
      accept: () => this.deleteLottery(id).subscribe(),
    });
  }

  private deleteLottery(lotteryId: number): Observable<void> {
    return this.lotteryApi.deleteLottery(lotteryId).pipe(
      tap((response) => {
        this.lotterys.update((lotterys) =>
          lotterys.filter((lottery) => lottery.id !== lotteryId)
        );
        this.showMessage(response.message);
      }),
      tap((_) => this.router.navigate(['/admin/dashboard/sorteos'])),
      switchMap(() => EMPTY)
    );
  }

  private showMessage(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Listo!',
      detail: message,
    });
  }
}
