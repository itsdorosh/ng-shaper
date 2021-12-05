import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  Mesh,
  BoxBufferGeometry,
  MeshPhongMaterial,
  AmbientLight,
  HemisphereLight,
  SphereBufferGeometry,
  CylinderBufferGeometry,
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { DataService } from '../data.service';
import { GeometryType, IFigureItem } from '../figure-item.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
})
export class ViewerComponent implements AfterViewInit {

  @ViewChild('viewerRoot')
  private canvasRef!: ElementRef;

  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;
  private controls!: OrbitControls;

  private drawedFiguresUUIDs: string[] = [];

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.createScene();
    this.animate();

    this.dataService.data$.subscribe((figureList: IFigureItem[]) => {
      figureList.forEach((figure: IFigureItem) => !this.drawedFiguresUUIDs.includes(figure.id) && this.draw(figure));
    });
  }

  private createScene(): void {
    this.scene = new Scene();
    this.scene.background = new Color(0x434343);

    this.camera = new PerspectiveCamera(70, this.canvasRef.nativeElement.clientWidth / this.canvasRef.nativeElement.clientHeight, 1, 1000);
    this.camera.position.z = 20;

    this.renderer = new WebGLRenderer({ canvas: this.canvasRef.nativeElement });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvasRef.nativeElement.clientWidth, this.canvasRef.nativeElement.clientHeight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.7);
    hemisphereLight.position.set(2.5, 10, 5);
    this.scene.add(new AmbientLight(0x404040), hemisphereLight);
  }

  private animate(): void {
    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      this.animate();
    });
  }

  public draw(figure: IFigureItem): void {
    let geometry: BoxBufferGeometry | SphereBufferGeometry | CylinderBufferGeometry;

    switch (figure.geometryType) {
      case GeometryType.BOX: {
        geometry = new BoxBufferGeometry(figure.size, figure.size, figure.size);
        break;
      }

      case GeometryType.SPHERE: {
        geometry = new SphereBufferGeometry(figure.size);
        break;
      }

      case GeometryType.CYLINDER: {
        geometry = new CylinderBufferGeometry(figure.size, figure.size, this.getRandomNumber(1, 5));
        break;
      }
    }

    const mesh = new Mesh(geometry, new MeshPhongMaterial({ color: figure.color }));
    mesh.position.set(this.getRandomNumber(-5, 5), this.getRandomNumber(-2.5, 2.5), this.getRandomNumber(-5, 5));
    this.scene.add(mesh);
    this.drawedFiguresUUIDs.push(figure.id);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
