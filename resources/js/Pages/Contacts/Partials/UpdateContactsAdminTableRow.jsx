import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import TextInputWithOptions from "@/Components/TextInputWithOptions";
import { departmentList } from "@/Utils/constants";
import { removeEmptyValues } from "@/Utils/functions";
import { useForm } from "@moraki/inertia-react";
import debounce from "just-debounce-it";
import { useCallback } from "react";

function UpdateContactsAdminTableRow({ item, setEditingItem, companies = [] }) {
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: item.name,
        phone: item.phone,
        address: item.address,
        department: item.department,
        companyName: item.companyName || "",
        linked_company_id: item.linked_company_id || "",
    });

    const selectableDepartments = departmentList.map((department) => ({
        key: department,
        value: department,
    }));

    const selectableCompanies = companies.map((company) => ({
        key: company.id,
        value: company.name,
    }));

    const handleSave = (e) => {
        e.preventDefault();

        let transformedData = data;

        if (data.linked_company_id !== null) {
            transformedData = removeEmptyValues({
                ...data,
                linked_company_id: Number(data.linked_company_id),
            });
        }

        patch(route("contacts.update", item.id), {
            data: transformedData,
            onSuccess: () => handleCancel(),
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        setEditingItem(null);
        reset();
        clearErrors();
    };

    const handleChangeLinkedCompany = (e) => {
        const { key, value } = e.target;
        setData("companyName", value);
        updateLinkedCompanyIdFormField(value);
    };

    const updateLinkedCompanyIdFormField = useCallback(
        debounce((value) => {
            if (value === "") setData("linked_company_id", null);

            const selectedCompany = companies.find(
                (company) => company.name === value
            );

            if (!selectedCompany) return;

            setData("linked_company_id", selectedCompany.id);
        }, 300),
        [data]
    );

    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th
                scope="row"
                className="pl-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
                <InputError withSpace />
            </th>

            <td className="px-1 py-3">
                <TextInput
                    form="update_contact_form"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.name && "border-red-500")
                    }
                />
                <InputError withSpace message={errors.name} />
            </td>

            <td className="px-1 py-3">
                <TextInput
                    form="update_contact_form"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.phone && "border-red-500")
                    }
                />
                <InputError withSpace message={errors.phone} />
            </td>

            <td className="px-1 py-3">
                <TextInput
                    form="update_contact_form"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.address && "border-red-500")
                    }
                />
                <InputError withSpace message={errors.address} />
            </td>

            <td className="px-1 py-3">
                <TextInputWithOptions
                    form="update_contact_form"
                    optionList={selectableDepartments}
                    inputValue={data.department}
                    inputOnChange={(e) => setData("department", e.target.value)}
                    inputClassName={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.department && "border-red-500")
                    }
                    optionClassName="px-2 py-1 text-gray-900 text-sm hover:bg-indigo-100"
                />
                <InputError withSpace message={errors.department} />
            </td>

            <td className="px-1 py-3">
                <TextInputWithOptions
                    form="update_contact_form"
                    optionList={selectableCompanies}
                    inputValue={data.companyName}
                    inputOnChange={handleChangeLinkedCompany}
                    inputClassName={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.linked_company_id && "border-red-500")
                    }
                    optionClassName="px-2 py-1 text-gray-900 text-sm hover:bg-indigo-100"
                />
                <InputError withSpace message={errors.linked_company_id} />
            </td>

            <td className="px-1 py-2 text-center">
                <form onSubmit={handleSave} id="update_contact_form">
                    <button
                        form="update_contact_form"
                        className="font-medium text-gray-600 hover:text-blue-700"
                    >
                        Guardar
                    </button>
                </form>
                <InputError withSpace />
            </td>

            <td className="px-1 pr-5 py-2 text-center">
                <button
                    type="button"
                    className="font-medium text-gray-600 hover:text-red-700"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <InputError withSpace />
            </td>
        </tr>
    );
}

export default UpdateContactsAdminTableRow;
