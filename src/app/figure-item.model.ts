export enum GeometryType {
    BOX = "BOX_GEOMETRY",
    SPHERE = "SPHERE_GEOMETRY",
    CYLINDER = "CYLINDER_GEOMETRY",
}

export interface IFigureItem {
    id: string;
    name: string;
    color: string;
    geometryType: GeometryType,
    size: number;
}

export function mapToFigureItem(data: any): IFigureItem {
    return {
        id: data.id,
        name: data.name,
        color: data.color,
        geometryType:data.geometryType,
        size: data.size,
    };
}