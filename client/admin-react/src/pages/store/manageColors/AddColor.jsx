import React, {useState } from "react";
import { PlusSquare } from "lucide-react";
import { DialogTitle } from "@headlessui/react";
import { BlockPicker } from "react-color";

function AddColor() {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [buttonBC, setButtonBC] = useState("#262626");
    const [colorName, setColorName] = useState("");


    return (
        <div className="px-2">
            {/* header icon */}
            <div className="mx-auto flex w-12 h-12 items-center justify-center rounded-full bg-green-100">
                <PlusSquare aria-hidden="true" className="w-6 h-6 text-green-600" />
            </div>

            <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    add color
                </DialogTitle>

                {/* name input */}
                <div className="flex justify-center items-center mt-2 gap-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                        color name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        placeholder="color name"
                        className="block min-w-0 grow bg-gray-50 py-2 px-3 text-base text-gray-900 placeholder:text-gray-500 focus:outline-none rounded-md border"
                    />
                </div>

                {/* color picker toggle + preview */}
                <div className="flex justify-center items-center mt-4 gap-3">
                    <label className="block text-sm font-medium text-gray-800">color code</label>

                    {/* preview button */}
                    <button
                        type="button"
                        onClick={() => setShowColorPicker((s) => !s)}
                        className="w-10 h-10 border-2 rounded-md focus:outline-none"
                        style={{ backgroundColor: buttonBC }}
                        aria-label="Toggle color picker"
                        title={buttonBC}
                    />

                    {/* hex text display */}
                    <div className="text-sm font-medium text-gray-700">{buttonBC.toUpperCase()}</div>
                </div>

                {/* picker (absolute dropdown) */}
                {showColorPicker && (
                    <div className="mt-3 flex justify-center">
                        <BlockPicker
                            color={buttonBC}
                            onChange={(color) => {
                                // called on every change (drag), color is an object
                                setButtonBC(color.hex);
                            }}
                            onChangeComplete={(color) => {
                                // called when auth finishes selection
                                setButtonBC(color.hex);
                                // optionally close picker: setShowColorPicker(false);
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddColor;
