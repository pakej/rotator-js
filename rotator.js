/*
* Rotator 2.0.1
* Copyright © Zaim Ramlan
*/

class Rotator {

    /**
    * Initializes an instance of Rotator.
    *
    * @constructor
    * @author: Zaim Ramlan
    * @param {array} elementIds The array of `id`s of the elements to be rotated.
    */
    constructor(elementIds) {
        this._anticlockwiseButton = 0;
        this._clockwiseButton = 1;
        this._rotatorGroups = this._group(elementIds);
    }

    /**
    * Configures the buttons to rotate the element and temporarily store the
    * rotation angle, for form submission.
    */
    configure() {
        var self = this;
        self._rotatorGroups.forEach((group) => {
            self._createHiddenInputFor(group);
            self._bindButton(self._anticlockwiseButton, group);
            self._bindButton(self._clockwiseButton, group);
        });
    }

    /**
     * Creates the rotator group object based on the given element IDs.
     *
     * @param {array} elementIds The array of `id`s of the elements to be rotated.
     *
     * Each rotator group object contains the element ID itself, its hidden input ID,
     * its clockwise and anticlockwise button IDs respectively.
     */
    _group(elementIds) {
        var rotatorGroups = [];

        elementIds.forEach((id) => {
            var group = {
                element: id,
                hiddenInput: `${id}-rotation`,
                clockwiseButton: `${id}-clockwise-button`,
                anticlockwiseButton: `${id}-anticlockwise-button`
            };
            rotatorGroups.push(group);
        });

        return rotatorGroups;
    }

    /**
     * Creates the hidden input to store the rotation angle for the given rotator group.
     *
     * @param {object} rotatorGroup The object containing the rotator group's related IDs.
     */
    _createHiddenInputFor(rotatorGroup) {
        var element = document.getElementById(rotatorGroup.element);
        if (element !== null) {
            var hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.value = "0";
            hiddenInput.id = rotatorGroup.hiddenInput;
            element.appendChild(hiddenInput);
        }
    }

    /**
     * Binds the given button type for the given rotator group to rotate the rotator group's element in
     * clockwise/anticlowise direction.
     *
     * @param {integer} buttonType The constant integer to represent the clockwise/anticlockwise buttons.
     * @param {object} rotatorGroup The object containing the rotator group's related IDs.
     */
    _bindButton(buttonType, rotatorGroup) {
        var self = this;

        var isClockwiseButton = buttonType === self._clockwiseButton;
        var buttonId = isClockwiseButton ? rotatorGroup.clockwiseButton : rotatorGroup.anticlockwiseButton;
        var button = document.getElementById(buttonId);

        if (button !== null) {
            button.onclick = function() {
                self._rotateElementBasedOn(buttonType, rotatorGroup);
            };
        }
    }

    /**
     * Rotates the element based on the button type and the rotator group.
     *
     * @param {integer} buttonType The constant integer to represent the clockwise/anticlockwise buttons.
     * @param {object} rotatorGroup The object containing the rotator group's related IDs.
     */
    _rotateElementBasedOn(buttonType, rotatorGroup) {
        var hiddenInput = document.getElementById(rotatorGroup.hiddenInput);
        var storedRotation = hiddenInput.value;
        var rotationAngle = parseInt(storedRotation);

        switch (buttonType) {
            case this._anticlockwiseButton:
                if (rotationAngle === 0) rotationAngle = 360;
                rotationAngle -= 90;
                break;

            case this._clockwiseButton:
                rotationAngle += 90;
                if (rotationAngle === 360) rotationAngle = 0;
                break;
        }

        hiddenInput.value = rotationAngle;

        var element = document.getElementById(rotatorGroup.element);
        if (element !== null) element.style = this._elementStyleRotatedBy(rotationAngle);
    }

    /**
     * Creates the rotation to the element via CSS `transform` property.
     *
     * @param {integer} angle The rotation angle.
     */
    _elementStyleRotatedBy(angle) {
        css = "-webkit-transform: rotate(" + angle + "deg);";
        css += " -moz-transform: rotate(" + angle + "deg);";
        css += " -ms-transform: rotate(" + angle + "deg);";
        css += " -o-transform: rotate(" + angle + "deg);";
        css += " transform: rotate(" + angle + "deg);";
        return css;
    }
}

module.exports = Rotator;
