import Link from 'next/link'
import icons from '@/constants/icons'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Document } from '@/apis/fetchers/document/get-documents-for-category/fetcher'
import { useState } from 'react'
import DeleteDocumentModal from './delete-document.modal'
import ModifyDocumentNameModal from './modify-document-name-modal'
import { getRelativeTime } from '@/utils/date'
import { SortOption } from './document-list'

interface Props extends Document {
  sortOption: SortOption
}

export default function DocumentItem({ sortOption, ...document }: Props) {
  const { id, name, status, updatedAt } = document

  const [modifyDialogOpen, setModifyDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  return (
    <>
      <Link href={`/document/${id}`}>
        <div className="flex h-[78px] items-center justify-between rounded-lg bg-white px-[16px] py-[15px] transition duration-200 hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] lg:px-[27px]">
          <div className="mr-4 flex size-12 items-center justify-center rounded-full bg-gray-01">
            <Image src="/icons/file.svg" alt="" width={24} height={24} />
          </div>
          <div className="flex flex-1 flex-col items-start justify-between gap-[4px] overflow-hidden lg:mr-[48px] lg:flex-row lg:items-center">
            <div className="w-[230px] truncate text-body1-medium text-gray-09 lg:w-auto">
              {name}
            </div>
            <div className="flex items-center gap-[8px] lg:gap-[48px]">
              <div className="whitespace-nowrap text-small1-regular text-gray-06 lg:text-body2-regular">
                마지막 수정: {getRelativeTime(updatedAt)}
              </div>
              <div className="flex justify-center lg:w-[93px]">
                <div
                  className={cn(
                    'flex items-center h-[19px] px-[9px] rounded-[4px] text-[10px] font-medium whitespace-nowrap',
                    pickStatus[status].style
                  )}
                >
                  {pickStatus[status].label}
                </div>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex size-[25px] items-center justify-center rounded-full hover:bg-gray-02">
                <Image src={icons.kebab} alt="" width={15} height={3} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={(event) => {
                  event.stopPropagation()
                  setModifyDialogOpen(true)
                }}
              >
                <div className="flex gap-4">
                  <Image src="/icons/modify-pencil.svg" alt="" width={16} height={16} />
                  <span className="text-gray-09">이름 바꾸기</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(event) => {
                  event.stopPropagation()
                  setDeleteDialogOpen(true)
                }}
              >
                <div className="flex gap-4">
                  <Image src="/icons/trashcan-red.svg" alt="" width={16} height={16} />
                  <span className="text-notice-red">노트 삭제하기</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Link>
      <ModifyDocumentNameModal
        sortOption={sortOption}
        open={modifyDialogOpen}
        onOpenChange={setModifyDialogOpen}
        {...document}
      />
      <DeleteDocumentModal
        sortOption={sortOption}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        {...document}
      />
    </>
  )
}

const pickStatus = {
  PROCESSED: {
    style: 'bg-gray-02 text-gray-07',
    label: '최신 상태',
  },
  UNPROCESSED: {
    style: 'bg-orange-01 text-orange-06',
    label: 'pick 생성 가능',
  },
  PROCESSING: {
    style: 'bg-gray-02 text-gray-07',
    label: 'pick 생성 중',
  },
  KEYPOINT_UPDATE_POSSIBLE: {
    style: 'bg-orange-01 text-orange-06',
    label: 'pick 갱신 필요',
  },
  DEFAULT_DOCUMENT: {
    style: 'bg-gray-02 text-gray-07',
    label: '기본 노트',
  },
}
