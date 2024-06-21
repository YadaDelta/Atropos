var { createScript, Vec2 } = pc;

/**
 * Utility function for both touch and gamepad handling of deadzones. Takes a 2-axis joystick
 * position in the range -1 to 1 and applies an upper and lower radial deadzone, remapping values in
 * the legal range from 0 to 1.
 *
 * @param {Vec2} pos - The joystick position.
 * @param {Vec2} remappedPos - The remapped joystick position.
 * @param {number} deadZoneLow - The lower dead zone.
 * @param {number} deadZoneHigh - The upper dead zone.
 */
function applyRadialDeadZone(pos, remappedPos, deadZoneLow, deadZoneHigh) {
    const magnitude = pos.length();

    if (magnitude > deadZoneLow) {
        const legalRange = 1 - deadZoneHigh - deadZoneLow;
        const normalizedMag = Math.min(1, (magnitude - deadZoneLow) / legalRange);
        remappedPos.copy(pos).scale(normalizedMag / magnitude);
    } else {
        remappedPos.set(0, 0);
    }
}

class DesktopInput {
    /**
     * @type {HTMLCanvasElement}
     * @private
     */
    _canvas;

    /**
     * @type {boolean}
     * @private
     */
    _enabled = true;

    /**
     * @type {AppBase}
     */
    app;

    /**
     * @param {AppBase} app - The application.
     */
    constructor(app) {
        this.app = app;
        this._canvas = app.graphicsDevice.canvas;

        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);

        this.enabled = true;
    }

    set enabled(val) {
        this._enabled = val;

        if (val) {
            window.addEventListener('keydown', this._onKeyDown);
            window.addEventListener('keyup', this._onKeyUp);
            window.addEventListener('mousedown', this._onMouseDown);
            window.addEventListener('mousemove', this._onMouseMove);
        } else {
            window.removeEventListener('keydown', this._onKeyDown);
            window.removeEventListener('keyup', this._onKeyUp);
            window.removeEventListener('mousedown', this._onMouseDown);
            window.removeEventListener('mousemove', this._onMouseMove);
        }
    }

    get enabled() {
        return this._enabled;
    }

    /**
     * @param {string} key - The key pressed.
     * @param {number} val - The key value.
     * @private
     */
    _handleKey(key, val) {
        switch (key.toLowerCase()) {
            case 'w':
            case 'ц':
            case 'arrowup':
                this.app.fire('cc:move:forward', val);
                break;
            case 's':
            case 'ы':
            case 'arrowdown':
                this.app.fire('cc:move:backward', val);
                break;
            case 'a':
            case 'ф':
            case 'arrowleft':
                this.app.fire('cc:move:left', val);
                break;
            case 'd':
            case 'в':
            case 'arrowright':
                this.app.fire('cc:move:right', val);
                break;
            case ' ':
                this.app.fire('cc:jump', !!val);
                break;
            case 'shift':
                this.app.fire('cc:sprint', !!val);
                break;
        }
    }

    /**
     * @param {KeyboardEvent} e - The keyboard event.
     * @private
     */
    _onKeyDown(e) {
        if (document.pointerLockElement !== this._canvas) {
            return;
        }

        if (e.repeat) {
            return;
        }
        this._handleKey(e.key, 1);
    }

    /**
     * @param {KeyboardEvent} e - The keyboard event.
     * @private
     */
    _onKeyUp(e) {
        if (e.repeat) {
            return;
        }
        this._handleKey(e.key, 0);
    }

    _onMouseDown(e) {
        if (document.pointerLockElement !== this._canvas) {
            this._canvas.requestPointerLock();
        }
    }

    /**
     * @param {MouseEvent} e - The mouse event.
     * @private
     */
    _onMouseMove(e) {
        if (document.pointerLockElement !== this._canvas) {
            return;
        }

        const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

        this.app.fire('cc:look', movementX, movementY);
    }

    destroy() {
        this.enabled = false;
    }
}

class MobileInput {
    /**
     * @type {GraphicsDevice}
     * @private
     */
    _device;

    /**
     * @type {HTMLCanvasElement}
     * @private
     */
    _canvas;

    /**
     * @type {boolean}
     * @private
     */
    _enabled = true;

    /**
     * @type {number}
     * @private
     */
    _lastRightTap = 0;

    /**
     * @type {number}
     * @private
     */
    _jumpTimeout;

    /**
     * @type {Vec2}
     * @private
     */
    _remappedPos = new Vec2();

    /**
     * @type {{ identifier: number, center: Vec2; pos: Vec2 }}
     * @private
     */
    _leftStick = {
        identifier: -1,
        center: new Vec2(),
        pos: new Vec2()
    };

    /**
     * @type {{ identifier: number, center: Vec2; pos: Vec2 }}
     * @private
     */
    _rightStick = {
        identifier: -1,
        center: new Vec2(),
        pos: new Vec2()
    };

    /**
     * @type {AppBase}
     */
    app;

    /**
     * @type {number}
     */
    deadZone = 0.3;

    /**
     * @type {number}
     */
    turnSpeed = 30;

    /**
     * @type {number}
     */
    radius = 50;

    /**
     * @type {number}
     */
    _doubleTapInterval = 300;

    /**
     * @param {AppBase} app - The application.
     */
    constructor(app) {
        this.app = app;
        this._device = app.graphicsDevice;
        this._canvas = app.graphicsDevice.canvas;

        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);

        this.enabled = true;
    }

    set enabled(val) {
        this._enabled = val;
        if (val) {
            this._canvas.addEventListener('touchstart', this._onTouchStart, false);
            this._canvas.addEventListener('touchmove', this._onTouchMove, false);
            this._canvas.addEventListener('touchend', this._onTouchEnd, false);
        } else {
            this._canvas.removeEventListener('touchstart', this._onTouchStart, false);
            this._canvas.removeEventListener('touchmove', this._onTouchMove, false);
            this._canvas.removeEventListener('touchend', this._onTouchEnd, false);
        }
    }

    get enabled() {
        return this._enabled;
    }

    /**
     * @private
     * @param {TouchEvent} e - The touch event.
     */
    _onTouchStart(e) {
        e.preventDefault();

        const xFactor = this._device.width / this._canvas.clientWidth;
        const yFactor = this._device.height / this._canvas.clientHeight;

        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];

            if (touch.pageX <= this._canvas.clientWidth / 2 && this._leftStick.identifier === -1) {
                // If the user touches the left half of the screen, create a left virtual joystick...
                this._leftStick.identifier = touch.identifier;
                this._leftStick.center.set(touch.pageX, touch.pageY);
                this._leftStick.pos.set(0, 0);
                this.app.fire('leftjoystick:enable', touch.pageX * xFactor, touch.pageY * yFactor);
            } else if (touch.pageX > this._canvas.clientWidth / 2 && this._rightStick.identifier === -1) {
                // ...otherwise create a right virtual joystick
                this._rightStick.identifier = touch.identifier;
                this._rightStick.center.set(touch.pageX, touch.pageY);
                this._rightStick.pos.set(0, 0);
                this.app.fire('rightjoystick:enable', touch.pageX * xFactor, touch.pageY * yFactor);

                // See how long since the last tap of the right virtual joystick to detect a double tap (jump)
                const now = Date.now();
                if (now - this._lastRightTap < this._doubleTapInterval) {
                    if (this._jumpTimeout) {
                        clearTimeout(this._jumpTimeout);
                    }
                    this.app.fire('cc:jump', true);
                    this._jumpTimeout = setTimeout(() => this.app.fire('cc:jump', false), 50);
                }
                this._lastRightTap = now;
            }
        }
    }

    /**
     * @private
     * @param {TouchEvent} e - The touch event.
     */
    _onTouchMove(e) {
        e.preventDefault();

        const xFactor = this._device.width / this._canvas.clientWidth;
        const yFactor = this._device.height / this._canvas.clientHeight;

        const touches = e.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            const touch = touches[i];

            // Update the current positions of the two virtual joysticks
            if (touch.identifier === this._leftStick.identifier) {
                this._leftStick.pos.set(touch.pageX, touch.pageY);
                this._leftStick.pos.sub(this._leftStick.center);
                this._leftStick.pos.scale(1 / this.radius);
                this.app.fire('leftjoystick:move', touch.pageX * xFactor, touch.pageY * yFactor);
            } else if (touch.identifier === this._rightStick.identifier) {
                this._rightStick.pos.set(touch.pageX, touch.pageY);
                this._rightStick.pos.sub(this._rightStick.center);
                this._rightStick.pos.scale(1 / this.radius);
                this.app.fire('rightjoystick:move', touch.pageX * xFactor, touch.pageY * yFactor);
            }
        }
    }

    /**
     * @private
     * @param {TouchEvent} e - The touch event.
     */
    _onTouchEnd(e) {
        e.preventDefault();

        var touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i];

            // If this touch is one of the sticks, get rid of it...
            if (touch.identifier === this._leftStick.identifier) {
                this._leftStick.identifier = -1;
                this.app.fire('cc:move:forward', 0);
                this.app.fire('cc:move:backward', 0);
                this.app.fire('cc:move:left', 0);
                this.app.fire('cc:move:right', 0);
                this.app.fire('leftjoystick:disable');
            } else if (touch.identifier === this._rightStick.identifier) {
                this._rightStick.identifier = -1;
                this.app.fire('rightjoystick:disable');
            }
        }
    }

    /**
     * @param {number} dt - The delta time.
     */
    update(dt) {
        // Moving
        if (this._leftStick.identifier !== -1) {
            // Apply a lower radial dead zone. We don't need an upper zone like with a real joypad
            applyRadialDeadZone(this._leftStick.pos, this._remappedPos, this.deadZone, 0);

            const forward = -this._remappedPos.y;
            if (this._lastForward !== forward) {
                if (forward > 0) {
                    this.app.fire('cc:move:forward', Math.abs(forward));
                    this.app.fire('cc:move:backward', 0);
                }
                if (forward < 0) {
                    this.app.fire('cc:move:forward', 0);
                    this.app.fire('cc:move:backward', Math.abs(forward));
                }
                if (forward === 0) {
                    this.app.fire('cc:move:forward', 0);
                    this.app.fire('cc:move:backward', 0);
                }
                this._lastForward = forward;
            }

            const strafe = this._remappedPos.x;
            if (this._lastStrafe !== strafe) {
                if (strafe > 0) {
                    this.app.fire('cc:move:left', 0);
                    this.app.fire('cc:move:right', Math.abs(strafe));
                }
                if (strafe < 0) {
                    this.app.fire('cc:move:left', Math.abs(strafe));
                    this.app.fire('cc:move:right', 0);
                }
                if (strafe === 0) {
                    this.app.fire('cc:move:left', 0);
                    this.app.fire('cc:move:right', 0);
                }
                this._lastStrafe = strafe;
            }
        }

        // Looking
        if (this._rightStick.identifier !== -1) {
            // Apply a lower radial dead zone. We don't need an upper zone like with a real joypad
            applyRadialDeadZone(this._rightStick.pos, this._remappedPos, this.deadZone, 0);

            const movX = this._remappedPos.x * this.turnSpeed;
            const movY = this._remappedPos.y * this.turnSpeed;
            this.app.fire('cc:look', movX, movY);
        }
    }

    destroy() {
        this.enabled = false;
    }
}

class GamePadInput {
    /**
     * @type {number}
     * @private
     */
    _jumpTimeout;

    /**
     * @type {number}
     * @private
     */
    _lastForward = 0;

    /**
     * @type {number}
     * @private
     */
    _lastStrafe = 0;

    /**
     * @type {boolean}
     * @private
     */
    _lastJump = false;

    /**
     * @type {Vec2}
     * @private
     */
    _remappedPos = new Vec2();

    /**
     * @type {{ center: Vec2; pos: Vec2 }}
     * @private
     */
    _leftStick = {
        center: new Vec2(),
        pos: new Vec2()
    };

    /**
     * @type {{ center: Vec2; pos: Vec2 }}
     * @private
     */
    _rightStick = {
        center: new Vec2(),
        pos: new Vec2()
    };

    /**
     * @type {AppBase}
     */
    app;

    /**
     * @type {number}
     */
    deadZoneLow = 0.1;

    /**
     * @type {number}
     */
    deadZoneHigh = 0.1;

    /**
     * @type {number}
     */
    turnSpeed = 30;

    /**
     * @param {AppBase} app - The application.
     */
    constructor(app) {
        this.app = app;
    }

    /**
     * @param {number} dt - The delta time.
     */
    update(dt) {
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    
        for (let i = 0; i < gamepads.length; i++) {
            const gamepad = gamepads[i];
    
            // Only proceed if we have at least 2 sticks
            if (gamepad && gamepad.mapping === 'standard' && gamepad.axes.length >= 4) {
                // Moving (left stick)
                this._leftStick.pos.set(gamepad.axes[0], gamepad.axes[1]);
                applyRadialDeadZone(this._leftStick.pos, this._remappedPos, this.deadZoneLow, this.deadZoneHigh);


                const forward = -this._remappedPos.y;
                if (this._lastForward !== forward) {
                    if (forward > 0) {
                        this.app.fire('cc:move:forward', Math.abs(forward));
                        this.app.fire('cc:move:backward', 0);
                    }
                    if (forward < 0) {
                        this.app.fire('cc:move:forward', 0);
                        this.app.fire('cc:move:backward', Math.abs(forward));
                    }
                    if (forward === 0) {
                        this.app.fire('cc:move:forward', 0);
                        this.app.fire('cc:move:backward', 0);
                    }
                    this._lastForward = forward;
                }
    
                const strafe = this._remappedPos.x;
                if (this._lastStrafe !== strafe) {
                    if (strafe > 0) {
                        this.app.fire('cc:move:left', 0);
                        this.app.fire('cc:move:right', Math.abs(strafe));
                    }
                    if (strafe < 0) {
                        this.app.fire('cc:move:left', Math.abs(strafe));
                        this.app.fire('cc:move:right', 0);
                    }
                    if (strafe === 0) {
                        this.app.fire('cc:move:left', 0);
                        this.app.fire('cc:move:right', 0);
                    }
                    this._lastStrafe = strafe;
                }
    
                // Looking (right stick)
                this._rightStick.pos.set(gamepad.axes[2], gamepad.axes[3]);
                applyRadialDeadZone(this._rightStick.pos, this._remappedPos, this.deadZoneLow, this.deadZoneHigh);
    
                const movX = this._remappedPos.x * this.turnSpeed;
                const movY = this._remappedPos.y * this.turnSpeed;
                this.app.fire('cc:look', movX, movY);
    
                // Jumping (bottom button of right cluster)
                if (gamepad.buttons[0].pressed && !this._lastJump) {
                    if (this._jumpTimeout) {
                        clearTimeout(this._jumpTimeout);
                    }
                    this.app.fire('cc:jump', true);
                    this._jumpTimeout = setTimeout(() => this.app.fire('cc:jump', false), 50);
                }
                this._lastJump = gamepad.buttons[0].pressed;
            }
        }
    }

    destroy() {

    }
}

// SCRIPTS

const DesktopInputScript = createScript('desktopInput');

DesktopInputScript.prototype.initialize = function () {
    this.input = new DesktopInput(this.app);
    this.on('enable', () => (this.input.enabled = true));
    this.on('disable', () => (this.input.enabled = false));
    this.on('destroy', () => this.input.destroy());
};

const MobileInputScript = createScript('mobileInput');

MobileInputScript.attributes.add('deadZone', {
    title: 'Dead Zone',
    description: 'Radial thickness of inner dead zone of the virtual joysticks. This dead zone ensures the virtual joysticks report a value of 0 even if a touch deviates a small amount from the initial touch.',
    type: 'number',
    min: 0,
    max: 0.4,
    default: 0.3
});
MobileInputScript.attributes.add('turnSpeed', {
    title: 'Turn Speed',
    description: 'Maximum turn speed in degrees per second',
    type: 'number',
    default: 30
});
MobileInputScript.attributes.add('radius', {
    title: 'Radius',
    description: 'The radius of the virtual joystick in CSS pixels.',
    type: 'number',
    default: 50
});
MobileInputScript.attributes.add('_doubleTapInterval', {
    title: 'Double Tap Interval',
    description: 'The time in milliseconds between two taps of the right virtual joystick for a double tap to register. A double tap will trigger a cc:jump.',
    type: 'number',
    default: 300
});

MobileInputScript.prototype.initialize = function () {
    this.input = new MobileInput(this.app);
    this.input.deadZone = this.deadZone;
    this.input.turnSpeed = this.turnSpeed;
    this.input.radius = this.radius;
    this.input._doubleTapInterval = this._doubleTapInterval;
    this.on('enable', () => (this.input.enabled = true));
    this.on('disable', () => (this.input.enabled = false));
    this.on('destroy', () => this.input.destroy());
};

MobileInputScript.prototype.update = function (dt) {
    this.input.update(dt);
};

const GamePadInputScript = createScript('gamePadInput');

GamePadInputScript.attributes.add('deadZoneLow', {
    title: 'Low Dead Zone',
    description: "Radial thickness of inner dead zone of pad's joysticks. This dead zone ensures that all pads report a value of 0 for each joystick axis when untouched.",
    type: 'number',
    min: 0,
    max: 0.4,
    default: 0.1
});
GamePadInputScript.attributes.add('deadZoneHigh', {
    title: 'High Dead Zone',
    description: "Radial thickness of outer dead zone of pad's joysticks. This dead zone ensures that all pads can reach the -1 and 1 limits of each joystick axis.",
    type: 'number',
    min: 0,
    max: 0.4,
    default: 0.1
});
GamePadInputScript.attributes.add('turnSpeed', {
    title: 'Turn Speed',
    description: 'Maximum turn speed in degrees per second',
    type: 'number',
    default: 30
});

GamePadInputScript.prototype.initialize = function () {
    this.input = new GamePadInput(this.app);
    this.input.deadZoneLow = this.deadZoneLow;
    this.input.deadZoneHigh = this.deadZoneHigh;
    this.input.turnSpeed = this.turnSpeed;
    this.on('destroy', () => this.input.destroy());    
};

GamePadInputScript.prototype.update = function (dt) {
    this.input.update(dt);
};
