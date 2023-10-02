import Button from 'components/Button/Button'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextField from 'components/TextField/TextField'
import Textarea from 'components/Textarea/Textarea'
import { Controller, useForm } from 'react-hook-form'
import { required } from 'helpers/formValidation'
import {
  CATEGORY_BASE_URL,
  useCreateCategory,
  useCategory,
  useUpdateCategory
} from './categoryApi'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import Loader from 'components/Loader/Loader'
import Dropdown from 'components/Dropdown/Dropdown'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { SlPencil } from 'react-icons/sl'
import { MdDeleteOutline } from 'react-icons/md'
import { useState } from 'react'
import DeleteCategoryModal from './DeleteCategoryModal'
import InfoModal from 'components/InfoModal/InfoModal'

const CreateUpdateCategory = () => {
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false)
  const [showUnableToDeleteModal, setShowUnableToDeleteModal] = useState(false)

  const { categoryId } = useParams()
  const [isUpdating, setIsUpdating] = useState(false)
  const { mutate: createCategoryMutation } = useCreateCategory()
  const { mutate: updateCategoryMutation } = useUpdateCategory()

  const { data: category, isFetching: isFetchingCategory } =
    useCategory(categoryId)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const defaultValues: CategoryFormData = {
    name: category?.name || '',
    isActive: true
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<CategoryFormData>({
    defaultValues,
    values: defaultValues,
    mode: 'all'
  })

  const onSubmit = handleSubmit(async (formData) => {
    if (categoryId) {
      updateCategoryMutation(
        { ...formData, categoryId },
        {
          onSuccess() {
            toast.success('Category updated successfully')
            queryClient.invalidateQueries({
              queryKey: [CATEGORY_BASE_URL]
            })
            setIsUpdating(false)
          },
          onError(error: any) {
            toast.error(error.message)
          }
        }
      )
    } else {
      createCategoryMutation(formData, {
        onSuccess: async (response) => {
          toast.success('Category created successfully')
          queryClient.invalidateQueries({
            queryKey: [CATEGORY_BASE_URL]
          })
          navigate(`/catalogue/category/${response.data.id}`)
        },
        onError(error: any) {
          toast.error(error.message)
        }
      })
    }
  })

  const createMode = !categoryId
  const viewMode = !!categoryId && !isUpdating
  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/catalogue"
            className="text-sm text-main-3 font-semibold flex items-center gap-x-2"
          >
            <TbArrowNarrowLeft className="text-main-3" />
            Back
          </Link>
          <span className="md:text-2xl text-lg font-bold">
            {viewMode
              ? 'Category details'
              : isUpdating
              ? 'Edit category'
              : 'Add category'}
          </span>
          <div>
            {viewMode ? (
              <Dropdown
                menuButton={
                  <Button
                    label="Actions"
                    icon={HiOutlineChevronDown}
                    iconPosition="right"
                    className="ml-3 font-semibold text-sm"
                    disabled={isFetchingCategory}
                  />
                }
                items={[
                  {
                    id: 1,
                    label: 'Edit  category',
                    icon: SlPencil,
                    onClick: () => setIsUpdating(true)
                  },
                  {
                    id: 2,
                    label: 'Delete category',
                    icon: MdDeleteOutline,
                    onClick: () => {
                      if (
                        category?.productCount &&
                        category?.productCount > 0
                      ) {
                        setShowUnableToDeleteModal(true)
                      } else {
                        setShowDeleteCategoryModal(true)
                      }
                    }
                  }
                ]}
                classNameMenuItems="-mt-1 rigtht-5"
              />
            ) : (
              <Button
                className="bg-main-3 text-base font-semibold"
                label={`${isUpdating ? 'Save Changes' : 'Save & Publish'}`}
                onClick={onSubmit}
                disabled={!isValid || isFetchingCategory}
              />
            )}
          </div>
        </div>
        {isFetchingCategory ? (
          <div className="flex items-center justify-center h-80 ">
            <Loader className="h-5 w-5" />
          </div>
        ) : (
          <div className="border border-gray-100 bg-white rounded">
            <div className="md:flex block px-8 py-6 border-b-2 border-b-gray-50">
              <span className="w-1/5 text-base text-main-1 font-semibold block pb-4 md:pb-0">
                Details
              </span>
              <div className="md:w-4/5 w-full">
                <Controller
                  name="name"
                  rules={{
                    required
                  }}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      hasErrors={!!errors?.name}
                      error={errors?.name?.message as string}
                      maxCharacters={30}
                      placeholder="Name"
                      readOnly={viewMode}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      label="Description"
                      rows={6}
                      className="mt-5 mb-4"
                      hasErrors={!!errors?.description}
                      error={errors?.description?.message as string}
                      readOnly={viewMode}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="py-6 px-8">
              {(isUpdating || createMode) && (
                <Button
                  label={`${isUpdating ? 'Save Changes' : 'Save & Publish'}`}
                  className="block w-full mt-3"
                  onClick={onSubmit}
                  disabled={!isValid || isFetchingCategory}
                />
              )}
              {isUpdating && (
                <Button
                  label="Cancel"
                  className="block w-full mt-3"
                  onClick={() => setIsUpdating(false)}
                  appearance="outline"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <DeleteCategoryModal
        isOpen={showDeleteCategoryModal}
        onClose={() => {
          setShowDeleteCategoryModal(false)
        }}
        categoryId={categoryId || ''}
      />
      <InfoModal
        title="Unable to delete brand"
        info="Please make sure that there are no products that are under this brand before deleting."
        isOpen={showUnableToDeleteModal}
        onClose={() => {
          setShowUnableToDeleteModal(false)
        }}
      />
    </>
  )
}

export default CreateUpdateCategory
