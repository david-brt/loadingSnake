export const GRID_X = 41;
export const GRID_Y = 41;

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_X) + 1,
        y: Math.floor(Math.random() * GRID_Y) + 1,
    };
}

export function middleGridPosition(){
    return { x: Math.floor(GRID_X / 2), y: Math.floor(GRID_Y / 2) };
}

export function borderCollision(position) {
    return (
        position.x < 1 ||
        position.x > GRID_X ||
        position.y < 1 ||
        position.y > GRID_Y
    );
}
