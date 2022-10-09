import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: 'root',
})
export class SequenceService {

    sequenceFinishedSub = new BehaviorSubject<number>(0)
    sequenceFinished$ = this.sequenceFinishedSub.asObservable()

}