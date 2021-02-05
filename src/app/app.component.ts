import { Component, NgModule, ViewChild } from '@angular/core';
import {
  CdkDrag,
  CdkDropList, CdkDropListGroup, CdkDragMove,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {ViewportRuler} from "@angular/cdk/overlay";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer;

  public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  slideList: any[] = [
      {
        name: "99kote - Teste 1",
        idDashboardMetabase: "118",
        tempoDeExibicao: 15,
        dashboard: {
          id: "118",
          name: "99kote - Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Consumo de combustível",
        idDashboardMetabase: "64",
        tempoDeExibicao: 15,
        dashboard: {
          id: "64",
          name: "Consumo de combustível",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Consumo de combustível - Resumo do mês",
        idDashboardMetabase: "66",
        tempoDeExibicao: 15,
        dashboard: {
          id: "66",
          name: "Consumo de combustível - Resumo do mês",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "99kote - Teste 2",
        idDashboardMetabase: "119",
        tempoDeExibicao: 15,
        dashboard: {
          id: "119",
          name: "99kote - Teste 2",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Health Check",
        idDashboardMetabase: "68",
        tempoDeExibicao: 15,
        dashboard: {
          id: "68",
          name: "Health Check",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 1",
        idDashboardMetabase: "1",
        tempoDeExibicao: 15,
        dashboard: {
          id: "1",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 2",
        idDashboardMetabase: "2",
        tempoDeExibicao: 15,
        dashboard: {
          id: "2",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 3",
        idDashboardMetabase: "3",
        tempoDeExibicao: 15,
        dashboard: {
          id: "3",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 4",
        idDashboardMetabase: "4",
        tempoDeExibicao: 15,
        dashboard: {
          id: "4",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 5",
        idDashboardMetabase: "5",
        tempoDeExibicao: 15,
        dashboard: {
          id: "5",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      },
      {
        name: "Teste 6",
        idDashboardMetabase: "6",
        tempoDeExibicao: 15,
        dashboard: {
          id: "6",
          name: "Teste 1",
          tipoDeProvider: "Metabase",
          check: false
        },
        img: "/assets/img/notfound.png"
      }
    ];

  constructor(private viewportRuler: ViewportRuler) {
    this.target = null;
    this.source = null;
    //
  }

  ngAfterViewInit() {
    console.log(this.placeholder.element.nativeElement);
    
    let phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

  add(lista) {
    lista.push(this.items.length + 1);
  }

  remove(lista) {
    lista.pop();
  }

  shuffle(lista) {
    lista.sort(function() {
      return .5 - Math.random();
    });
  }

  dragMoved(e: CdkDragMove) {
    let point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped() {
    if (!this.target)
      return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex != this.targetIndex)
      moveItemInArray(this.slideList, this.sourceIndex, this.targetIndex);
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop == this.placeholder)
      return true;

    if (drop != this.activeContainer)
      return false;

    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';
      
      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex 
      ? dropElement.nextSibling : dropElement));
   
    this.placeholder._dropListRef.enter(drag._dragRef, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
    return false;
  }
  
  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
        const scrollPosition = this.viewportRuler.getViewportScrollPosition();

        return {
            x: point.pageX - scrollPosition.left,
            y: point.pageY - scrollPosition.top
        };
    }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right; 
}