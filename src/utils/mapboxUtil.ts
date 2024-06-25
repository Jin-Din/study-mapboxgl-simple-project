import * as turf from '@turf/turf';
import mapboxgl from 'mapbox-gl';
import {GeoJSON} from "geojson";

/**
 *
 * 获取多个点的边界框
 *
 * @param points
 */
export const pointsToBounds = (points: turf.FeatureCollection<turf.Point>): mapboxgl.LngLatBounds => {
    const bbox = turf.bbox(points);

    return mapboxgl.LngLatBounds.convert(bbox as [number, number, number, number]);
}

export const featureBounds = (feature: turf.Feature<turf.Geometry, any>): mapboxgl.LngLatBounds => {
    const bbox = turf.bbox(feature);

    return mapboxgl.LngLatBounds.convert(bbox as [number, number, number, number]);
}

/**
 * 创建一个遮罩层GeoJSON 对象
 * @param inputFeatures
 * @param maskPolygon
 */
export const createMaskPolygon = (inputFeatures: GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon> | GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>, maskPolygon?: GeoJSON.Feature<GeoJSON.Polygon>) => {
    /**
     * 默认的世界范围
     */
    const worldBounds: GeoJSON.Feature<GeoJSON.Polygon> = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Polygon",
            // 注意：polygon首尾坐标要一致
            coordinates: [[[-180, 90], [180, 90], [180, -90], [-180, -90], [-180, 90]]]
        }
    }
    let masked = turf.mask(inputFeatures, maskPolygon ?? worldBounds);

    return masked;
}